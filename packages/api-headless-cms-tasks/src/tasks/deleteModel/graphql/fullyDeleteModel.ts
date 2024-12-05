import { HcmsTasksContext } from "~/types";
import {
    DELETE_MODEL_TASK,
    MODEL_IS_GETTING_DELETED_TAG,
    MODEL_IS_GETTING_DELETED_TASK_ID_TAG
} from "~/tasks/deleteModel/constants";
import { IDeleteCmsModelTask, IDeleteModelTaskInput } from "~/tasks/deleteModel/types";
import { getStatus } from "~/tasks/deleteModel/graphql/status";

export interface IFullyDeleteModelParams {
    readonly context: Pick<HcmsTasksContext, "cms" | "tasks">;
    readonly modelId: string;
    readonly confirmation: string;
}

export const fullyDeleteModel = async (
    params: IFullyDeleteModelParams
): Promise<IDeleteCmsModelTask> => {
    const { context, modelId, confirmation } = params;

    const model = await context.cms.getModel(modelId);

    await context.cms.accessControl.ensureCanAccessModel({
        model,
        rwd: "d"
    });

    await context.cms.accessControl.ensureCanAccessEntry({
        model,
        rwd: "w"
    });

    if (!model) {
        throw new Error(`Model "${modelId}" not found.`);
    } else if (model.tags?.includes(MODEL_IS_GETTING_DELETED_TAG)) {
        const taskId = model.tags.find(tag => tag.startsWith(MODEL_IS_GETTING_DELETED_TASK_ID_TAG));
        throw new Error(
            `Model "${modelId}" is already being deleted. Task id: ${taskId || "unknown"}.`
        );
    }

    const task = await context.tasks.trigger<IDeleteModelTaskInput>({
        input: {
            modelId,
            confirmation
        },
        definition: DELETE_MODEL_TASK,
        name: `Fully delete model: ${modelId}`
    });

    return {
        id: task.id,
        status: getStatus(task.taskStatus),
        total: 0,
        deleted: 0
    };
};
