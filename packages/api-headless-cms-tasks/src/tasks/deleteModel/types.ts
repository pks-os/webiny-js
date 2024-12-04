import { ITaskResponseDoneResultOutput } from "@webiny/tasks";

export interface IDeleteModelTaskInput {
    modelId: string;
    cursor?: string;
    confirmation: string;
}

export type IDeleteModelTaskOutput = ITaskResponseDoneResultOutput;
