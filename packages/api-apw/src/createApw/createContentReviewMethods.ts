import {
    ApwContext,
    ApwContentReviewCrud,
    ApwContentReviewStepStatus,
    ApwWorkflowStepTypes,
    ApwContentReviewStatus
} from "~/types";
import { getValue, hasReviewer, getNextStepStatus } from "~/plugins/utils";
import {
    NoSignOffProvidedError,
    NotAuthorizedError,
    PendingChangeRequestsError,
    StepInActiveError,
    StepMissingError
} from "~/utils/errors";

export function createContentReviewMethods(context: ApwContext): ApwContentReviewCrud {
    return {
        async getModel() {
            return await context.cms.getModel("apwContentReviewModelDefinition");
        },
        async get(id) {
            const model = await this.getModel();
            return await context.cms.getEntryById(model, id);
        },
        async list(params) {
            const model = await this.getModel();
            return await context.cms.listLatestEntries(model, params);
        },
        async create(data) {
            const model = await this.getModel();
            return await context.cms.createEntry(model, {
                ...data,
                steps: [],
                status: ApwContentReviewStatus.UNDER_REVIEW
            });
        },
        async update(id, data) {
            const model = await this.getModel();
            const existingEntry = await this.get(id);

            return await context.cms.updateEntry(model, id, {
                ...existingEntry.values,
                ...data
            });
        },
        async delete(id) {
            const model = await this.getModel();
            await context.cms.deleteEntry(model, id);
            return true;
        },
        async provideSignOff(id, stepSlug) {
            const entry = await this.get(id);
            const steps = getValue(entry, "steps");
            const stepIndex = steps.findIndex(step => step.slug === stepSlug);
            const currentStep = steps[stepIndex];
            const previousStep = steps[stepIndex - 1];

            const identity = context.security.getIdentity();
            const hasPermission = await hasReviewer({
                getReviewer: context.apw.reviewer.get.bind(context.apw.reviewer),
                identity,
                step: currentStep
            });

            /**
             *  Check whether the sign-off is requested by a reviewer.
             */
            if (!hasPermission) {
                throw new NotAuthorizedError({ entry, input: { id, step: stepSlug } });
            }
            /**
             *  Don't allow sign off, if previous step is of "mandatory_blocking" type and undone.
             */
            if (
                previousStep &&
                previousStep.status !== ApwContentReviewStepStatus.DONE &&
                previousStep.type === ApwWorkflowStepTypes.MANDATORY_BLOCKING
            ) {
                throw new StepMissingError({ entry, input: { id, step: stepSlug } });
            }
            /**
             *  Don't allow sign off, if there are pending change requests.
             */
            if (currentStep.pendingChangeRequests > 0) {
                throw new PendingChangeRequestsError({ entry, input: { id, step: stepSlug } });
            }
            /**
             *  Don't allow sign off, if current step is not in "active" state.
             */
            if (currentStep.status !== ApwContentReviewStepStatus.ACTIVE) {
                throw new StepInActiveError({ entry, input: { id, step: stepSlug } });
            }
            let previousStepStatus;
            /*
             * Provide sign-off for give step.
             */
            const updatedSteps = steps.map((step, index) => {
                if (index === stepIndex) {
                    previousStepStatus = ApwContentReviewStepStatus.DONE;
                    return {
                        ...step,
                        status: ApwContentReviewStepStatus.DONE,
                        signOffProvidedOn: new Date().toISOString(),
                        signOffProvidedBy: identity
                    };
                }
                /**
                 * Update next steps status based on type.
                 */
                if (index > stepIndex) {
                    const previousStep = steps[index - 1];

                    previousStepStatus = getNextStepStatus(previousStep.type, previousStepStatus);
                    return {
                        ...step,
                        status: previousStepStatus
                    };
                }

                return step;
            });
            /**
             * Save updated steps.
             */
            await context.apw.contentReview.update(id, {
                steps: updatedSteps
            });
            return true;
        },
        async retractSignOff(id, stepSlug) {
            const entry = await this.get(id);
            const steps = getValue(entry, "steps");
            const stepIndex = steps.findIndex(step => step.slug === stepSlug);
            const currentStep = steps[stepIndex];

            const identity = context.security.getIdentity();

            const hasPermission = await hasReviewer({
                getReviewer: context.apw.reviewer.get.bind(context.apw.reviewer),
                identity,
                step: currentStep
            });

            /**
             *  Check whether the retract sign-off is requested by a reviewer.
             */
            if (!hasPermission) {
                throw new NotAuthorizedError({ entry, input: { id, step: stepSlug } });
            }
            /**
             *  Don't allow, if step in not "done" i.e. no sign-off was provided for it.
             */
            if (currentStep.status !== ApwContentReviewStepStatus.DONE) {
                throw new NoSignOffProvidedError({ entry, input: { id, step: stepSlug } });
            }
            let previousStepStatus;

            /*
             * Retract sign-off for give step.
             */
            const updatedSteps = steps.map((step, index) => {
                if (index === stepIndex) {
                    previousStepStatus = ApwContentReviewStepStatus.ACTIVE;
                    return {
                        ...step,
                        status: previousStepStatus,
                        signOffProvidedOn: null,
                        signOffProvidedBy: null
                    };
                }
                /**
                 * Set next step status as "inactive".
                 */
                if (index > stepIndex) {
                    const previousStep = steps[index - 1];

                    previousStepStatus = getNextStepStatus(previousStep.type, previousStepStatus);

                    return {
                        ...step,
                        status: previousStepStatus
                    };
                }

                return step;
            });

            await context.apw.contentReview.update(id, {
                steps: updatedSteps
            });
            return true;
        }
    };
}
