import {
    IDeleteCmsModelTask,
    IDeleteModelTaskInput,
    IDeleteModelTaskOutput
} from "~/tasks/deleteModel/types";
import { HcmsTasksContext } from "~/types";
import {
    DELETE_MODEL_TASK,
    MODEL_IS_GETTING_DELETED_TASK_ID_TAG
} from "~/tasks/deleteModel/constants";
import { WebinyError } from "@webiny/error";
import { getStatus } from "~/tasks/deleteModel/graphql/status";

export interface IGetDeleteModelProgress {
    readonly context: Pick<HcmsTasksContext, "cms" | "tasks">;
    readonly modelId: string;
}

export const getDeleteModelProgress = async (
    params: IGetDeleteModelProgress
): Promise<IDeleteCmsModelTask> => {
    const { context, modelId } = params;

    const model = await context.cms.getModel(modelId);

    await context.cms.accessControl.ensureCanAccessModel({
        model,
        rwd: "d"
    });

    await context.cms.accessControl.ensureCanAccessEntry({
        model,
        rwd: "w"
    });

    const tag = (model.tags || []).find(tag =>
        tag.startsWith(MODEL_IS_GETTING_DELETED_TASK_ID_TAG)
    );
    const taskId = tag ? tag.replace(MODEL_IS_GETTING_DELETED_TASK_ID_TAG, "") : null;
    if (!taskId) {
        throw new Error(`Model "${modelId}" is not being deleted.`);
    }

    const task = await context.tasks.getTask<IDeleteModelTaskInput, IDeleteModelTaskOutput>(taskId);
    if (task?.definitionId !== DELETE_MODEL_TASK) {
        throw new WebinyError({
            message: `The task which is deleting a model cannot be found.`,
            code: "DELETE_MODEL_TASK_NOT_FOUND",
            data: {
                model: model.modelId,
                task: taskId
            }
        });
    }
    return {
        id: task.id,
        status: getStatus(task.taskStatus),
        total: task.output?.total || 0,
        deleted: task.output?.deleted || 0
    };
};
