import { HcmsTasksContext } from "~/types";
import {
    IDeleteCmsModelTask,
    IDeleteModelTaskInput,
    IDeleteModelTaskOutput
} from "~/tasks/deleteModel/types";
import { DELETE_MODEL_TASK } from "~/tasks/deleteModel/constants";
import { WebinyError } from "@webiny/error";
import { getStatus } from "~/tasks/deleteModel/graphql/status";
import { getTaskIdFromTag, removeTag } from "~/tasks/deleteModel/helpers/tag";

export interface IAbortDeleteModelParams {
    readonly context: Pick<HcmsTasksContext, "cms" | "tasks">;
    readonly modelId: string;
}

export const abortDeleteModel = async (
    params: IAbortDeleteModelParams
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

    const taskId = getTaskIdFromTag(model.tags);
    if (!taskId) {
        throw new Error(`Model "${modelId}" is not being deleted.`);
    }

    await context.cms.updateModelDirect({
        model: {
            ...model,
            tags: removeTag(model.tags)
        },
        original: model
    });

    const task = await context.tasks.getTask<IDeleteModelTaskInput, IDeleteModelTaskOutput>(taskId);
    if (task?.definitionId !== DELETE_MODEL_TASK) {
        throw new WebinyError({
            message: `The task which is deleting a model cannot be found. Please check Step Functions for more info. Task id: ${taskId}`,
            code: "DELETE_MODEL_TASK_NOT_FOUND",
            data: {
                model: model.modelId,
                task: taskId
            }
        });
    }

    const abortedTask = await context.tasks.abort<IDeleteModelTaskInput, IDeleteModelTaskOutput>({
        id: task.id,
        message: "User aborted the task."
    });

    return {
        id: abortedTask.id,
        status: getStatus(abortedTask.taskStatus),
        total: abortedTask.output?.total || 0,
        deleted: abortedTask.output?.deleted || 0
    };
};
