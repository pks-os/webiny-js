export interface ISQSTransfer {
    send(params: ISQSTransferSendParams): Promise<void>;
}

export interface ISQSTransferSendParamsAttribute {
    name: string;
    value: string;
}

export interface ISQSTransferSendParams {
    body: string;
    attributes?: ISQSTransferSendParamsAttribute[];
    groupId: string;
    deduplicationId?: string;
}
