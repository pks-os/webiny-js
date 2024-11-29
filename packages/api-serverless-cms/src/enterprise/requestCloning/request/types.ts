import type { APIGatewayEvent } from "@webiny/handler-aws/types";

export interface IRequestTransferSendParams {
    key: string;
    event: APIGatewayEvent;
}

export type IRequestTransferSendResult = void;

export interface IRequestTransfer {
    send(params: IRequestTransferSendParams): Promise<IRequestTransferSendResult>;
}
