import { HcmsTasksContext } from "~/types";
import { DELETE_MODEL_TASK, MODEL_IS_GETTING_DELETED_TAG } from "~/tasks/deleteModel/constants";
import { IDeleteModelTaskInput, IDeleteModelTaskOutput } from "~/tasks/deleteModel/types";
import { ITask } from "@webiny/tasks";

export interface IFullyDeleteModelParams {
    readonly context: Pick<HcmsTasksContext, "cms" | "tasks">;
    readonly modelId: string;
    readonly confirmation: string;
}

export const fullyDeleteModel = async (
    params: IFullyDeleteModelParams
): Promise<ITask<IDeleteModelTaskInput, IDeleteModelTaskOutput>> => {
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
        throw new Error(`Model "${modelId}" is already being deleted.`);
    }

    return await context.tasks.trigger<IDeleteModelTaskInput>({
        input: {
            modelId,
            confirmation
        },
        definition: DELETE_MODEL_TASK,
        name: `Fully delete model: ${modelId}`
    });
};
