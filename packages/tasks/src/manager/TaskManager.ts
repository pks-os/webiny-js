import { ITaskManager } from "./types";
import { ITaskRunner } from "~/runner/abstractions";
import { Context, ITaskData, ITaskDefinition, TaskResponseStatus } from "~/types";
import {
    IResponse,
    IResponseResult,
    ITaskResponse,
    ITaskResponseResult
} from "~/response/abstractions";
import { TaskResponse } from "~/response";

export class TaskManager<T = unknown> implements ITaskManager {
    private readonly runner: Pick<ITaskRunner, "isCloseToTimeout">;
    private readonly context: Context;
    private readonly definition: ITaskDefinition;
    private readonly task: ITaskData<T>;
    private readonly response: IResponse;
    private readonly taskResponse: ITaskResponse;

    public constructor(
        runner: Pick<ITaskRunner, "isCloseToTimeout">,
        context: Context,
        response: IResponse,
        task: ITaskData<T>,
        definition: ITaskDefinition
    ) {
        this.runner = runner;
        this.context = context;
        this.response = response;
        this.definition = definition;
        this.task = task;
        this.taskResponse = new TaskResponse(this.response);
    }

    public async run(): Promise<IResponseResult> {
        /**
         * We should not even run if the Lambda timeout is close.
         */
        if (this.runner.isCloseToTimeout()) {
            /**
             * We use the same input as the one on the task - we did not run anything, so no need to change the input.
             */
            return this.response.continue({
                input: this.task.input
            });
        }

        let result: ITaskResponseResult;

        try {
            result = await this.definition.run({
                input: structuredClone(this.task.input),
                context: this.context,
                response: this.taskResponse,
                task: structuredClone(this.task),
                isCloseToTimeout: () => {
                    return this.runner.isCloseToTimeout();
                }
            });
        } catch (ex) {
            return this.response.error({
                error: ex
            });
        }

        if (result.status === TaskResponseStatus.CONTINUE) {
            return this.response.continue({
                input: result.input
            });
        } else if (result.status === TaskResponseStatus.ERROR) {
            return this.response.error({
                error: result.error
            });
        }
        return this.response.done({
            message: result.message
        });
    }
}
