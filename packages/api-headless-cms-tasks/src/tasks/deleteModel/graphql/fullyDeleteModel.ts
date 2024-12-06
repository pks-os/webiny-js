import { HcmsTasksContext } from "~/types";
import { DELETE_MODEL_TASK } from "~/tasks/deleteModel/constants";
import { IDeleteCmsModelTask, IDeleteModelTaskInput } from "~/tasks/deleteModel/types";
import { getStatus } from "~/tasks/deleteModel/graphql/status";
import { getTaskIdFromTag } from "~/tasks/deleteModel/helpers/tag";

export interface IFullyDeleteModelParams {
    readonly context: Pick<HcmsTasksContext, "cms" | "tasks">;
    readonly modelId: string;
}

export const fullyDeleteModel = async (
    params: IFullyDeleteModelParams
): Promise<IDeleteCmsModelTask> => {
    const { context, modelId } = params;

    const model = await context.cms.getModel(modelId);

    if (model.isPrivate) {
        throw new Error(`Cannot delete private model.`);
    } else if (model.isPlugin) {
        throw new Error(`Cannot delete plugin model.`);
    }

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
    }
    const taskId = getTaskIdFromTag(model.tags);
    if (taskId) {
        throw new Error(
            `Model "${modelId}" is already being deleted. Task id: ${taskId || "unknown"}.`
        );
    }

    const task = await context.tasks.trigger<IDeleteModelTaskInput>({
        input: {
            modelId
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
