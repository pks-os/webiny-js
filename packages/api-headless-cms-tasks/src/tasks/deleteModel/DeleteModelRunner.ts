import { ITaskResponse, ITaskResponseResult, ITaskRunParams } from "@webiny/tasks";
import { HcmsTasksContext } from "~/types";
import { IDeleteModelTaskInput, IDeleteModelTaskOutput } from "./types";
import { CmsEntryListWhere, CmsModel } from "@webiny/api-headless-cms/types";
import { containsTaskTag, createTaskTag, removeTag } from "~/tasks/deleteModel/helpers/tag";

export interface IDeleteModelRunnerParams<
    C extends HcmsTasksContext,
    I extends IDeleteModelTaskInput,
    O extends IDeleteModelTaskOutput
> {
    taskId: string;
    context: C;
    response: ITaskResponse<I, O>;
}

export type IExecuteParams<
    C extends HcmsTasksContext,
    I extends IDeleteModelTaskInput,
    O extends IDeleteModelTaskOutput
> = Omit<ITaskRunParams<C, I, O>, "context" | "response" | "store" | "timer" | "trigger">;

export class DeleteModelRunner<
    C extends HcmsTasksContext,
    I extends IDeleteModelTaskInput,
    O extends IDeleteModelTaskOutput
> {
    private readonly taskId: string;
    private readonly context: C;
    private readonly response: ITaskResponse<I, O>;

    public constructor(params: IDeleteModelRunnerParams<C, I, O>) {
        this.taskId = params.taskId;
        this.context = params.context;
        this.response = params.response;
    }

    public async execute(params: IExecuteParams<C, I, O>): Promise<ITaskResponseResult<I, O>> {
        const { input, isCloseToTimeout, isAborted } = params;

        let model = await this.getModel(input.modelId);
        /**
         * We need to mark model as getting deleted, so that we can prevent any further operations on it.
         */
        const tag = containsTaskTag(model.tags);
        if (!tag) {
            model = await this.addDeletingTag(model);
        }

        let hasMoreItems = false;
        let lastDeletedId: string | undefined = input.lastDeletedId;
        do {
            if (isAborted()) {
                /**
                 * If the task was aborted, we need to remove the task tag from the model.
                 */
                await this.removeDeletingTag(model);
                return this.response.aborted();
            } else if (isCloseToTimeout()) {
                return this.response.continue({
                    ...input,
                    lastDeletedId
                });
            }
            let where: CmsEntryListWhere | undefined = undefined;
            if (lastDeletedId) {
                where = {
                    entryId_gte: lastDeletedId
                };
            }
            const [items, meta] = await this.context.cms.listLatestEntries(model, {
                limit: 1000,
                where,
                sort: ["id_ASC"]
            });
            for (const item of items) {
                const result = await this.deleteEntry(model, item.id);
                if (!result) {
                    return this.response.error(
                        new Error(`Failed to delete entry "${item.id}". Cannot continue.`)
                    );
                }
                lastDeletedId = item.entryId;
            }

            hasMoreItems = meta.hasMoreItems;
        } while (hasMoreItems);
        /**
         * Let's do one more check. If there are items, continue the task with 5 seconds delay.
         */
        const [items] = await this.context.cms.listLatestEntries(model, {
            limit: 1
        });
        if (items.length > 0) {
            console.log("There are still items to be deleted. Continuing the task.");
            return this.response.continue(
                {
                    ...input
                },
                {
                    seconds: 5
                }
            );
        }
        /**
         * When there is no more records to be deleted, let's delete the model.
         */
        try {
            await this.context.cms.deleteModel(model.modelId);
        } catch (ex) {
            await this.removeDeletingTag(model);
            const message = `Failed to delete model "${model.modelId}".`;
            console.error(message);
            return this.response.error(ex);
        }

        return this.response.done();
    }

    private async getModel(modelId: string): Promise<CmsModel> {
        const model = await this.context.cms.getModel(modelId);
        if (!model) {
            throw new Error(`Model "${modelId}" not found.`);
        }
        return model;
    }

    private async addDeletingTag(model: CmsModel): Promise<CmsModel> {
        return await this.context.cms.updateModelDirect({
            model: {
                ...model,
                tags: [...(model.tags || []), createTaskTag(this.taskId)]
            },
            original: model
        });
    }

    private async removeDeletingTag(model: CmsModel): Promise<CmsModel> {
        return await this.context.cms.updateModelDirect({
            model: {
                ...model,
                tags: removeTag(model.tags)
            },
            original: model
        });
    }

    private async deleteEntry(model: CmsModel, id: string): Promise<boolean> {
        try {
            await this.context.cms.deleteEntry(model, id, {
                permanently: true,
                force: true
            });
            return true;
        } catch (ex) {
            console.warn("Failed to delete entry.", {
                model: model.modelId,
                id
            });
        }
        return false;
    }
}

export const createDeleteModelRunner = <
    C extends HcmsTasksContext,
    I extends IDeleteModelTaskInput,
    O extends IDeleteModelTaskOutput
>(
    params: IDeleteModelRunnerParams<C, I, O>
) => {
    return new DeleteModelRunner<C, I, O>(params);
};
