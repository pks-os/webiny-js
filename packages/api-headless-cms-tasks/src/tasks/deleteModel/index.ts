import { createTaskDefinition } from "@webiny/tasks";
import { HcmsTasksContext } from "~/types";
import { IDeleteModelTaskInput, IDeleteModelTaskOutput } from "./types";
import { createDeleteModelRunner } from "~/tasks/deleteModel/DeleteModelRunner";
import { validateConfirmation } from "~/tasks/deleteModel/helpers/confirmation";
import { DELETE_MODEL_TASK } from "./constants";
import { createDeleteModelGraphQl } from "~/tasks/deleteModel/graphql";

const createDefinition = () => {
    return createTaskDefinition<HcmsTasksContext, IDeleteModelTaskInput, IDeleteModelTaskOutput>({
        id: DELETE_MODEL_TASK,
        disableDatabaseLogs: true,
        title: "Delete model and all of the entries",
        maxIterations: 50,
        isPrivate: true,
        async run(params) {
            try {
                const deleteModelRunner = createDeleteModelRunner({
                    context: params.context,
                    response: params.response,
                    store: params.store
                });
                return await deleteModelRunner.execute({
                    input: params.input,
                    isCloseToTimeout: params.isCloseToTimeout,
                    isAborted: params.isAborted
                });
            } catch (ex) {
                return params.response.error(ex);
            }
        },
        createInputValidation: ({ validator }) => {
            return validator
                .object({
                    modelId: validator.string(),
                    cursor: validator.string().optional(),
                    confirmation: validator.string()
                })
                .refine(
                    schema => {
                        return validateConfirmation(schema);
                    },
                    {
                        message: `Confirmation input does not match the generated one.`
                    }
                );
        }
    });
};

export const createDeleteModelTask = () => {
    return [createDefinition(), createDeleteModelGraphQl()];
};
