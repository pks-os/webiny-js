import {
    ITaskManagerStore,
    ITaskResponse,
    ITaskResponseResult,
    ITaskRunParams
} from "@webiny/tasks";
import { HcmsTasksContext } from "~/types";
import { IDeleteModelTaskInput, IDeleteModelTaskOutput } from "./types";
import { MODEL_IS_GETTING_DELETED_TAG } from "~/tasks/deleteModel/constants";
import { CmsModel } from "@webiny/api-headless-cms/types";

export interface IDeleteModelRunnerParams<
    C extends HcmsTasksContext,
    I extends IDeleteModelTaskInput,
    O extends IDeleteModelTaskOutput
> {
    context: C;
    response: ITaskResponse<I, O>;
    store: ITaskManagerStore<I>;
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
    private readonly context: C;
    private readonly response: ITaskResponse<I, O>;
    private readonly store: ITaskManagerStore<I>;

    public constructor(params: IDeleteModelRunnerParams<C, I, O>) {
        this.context = params.context;
        this.response = params.response;
        this.store = params.store;
    }

    public async execute(params: IExecuteParams<C, I, O>): Promise<ITaskResponseResult<I, O>> {
        const { input, isCloseToTimeout, isAborted } = params;

        let model = await this.getModel(input.modelId);
        /**
         * We need to mark model as getting deleted, so that we can prevent any further operations on it.
         */
        if (!model.tags?.includes(MODEL_IS_GETTING_DELETED_TAG)) {
            model = await this.addDeletingTag(model);
        }

        let hasMoreItems = false;
        let cursor: string | undefined = input.cursor;
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
                    cursor
                });
            }
            const [items, meta] = await this.context.cms.listLatestEntries(model, {
                limit: 100,
                after: cursor,
                sort: ["id_ASC"]
            });

            for (const item of items) {
                try {
                    await this.context.cms.deleteEntry(model, item.id, {
                        permanently: true,
                        force: true
                    });
                } catch (ex) {
                    console.log(`Failed to delete entry "${item.id}".`);
                }
            }

            hasMoreItems = meta.hasMoreItems;
            cursor = meta.cursor || undefined;
        } while (hasMoreItems);
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
                tags: [...(model.tags || []), MODEL_IS_GETTING_DELETED_TAG, this.getTaskTag()]
            },
            original: model
        });
    }

    private async removeDeletingTag(model: CmsModel): Promise<CmsModel> {
        return await this.context.cms.updateModelDirect({
            model: {
                ...model,
                tags: (model.tags || []).filter(tag => {
                    if (tag === MODEL_IS_GETTING_DELETED_TAG) {
                        return false;
                    } else if (tag === this.getTaskTag()) {
                        return false;
                    }
                    return true;
                })
            },
            original: model
        });
    }

    private getTaskTag(): string {
        return `task:${this.store.getTask().id}`;
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
