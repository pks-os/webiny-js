import type {
    MessageAttributeValue,
    SendMessageCommandInput,
    SQSClient
} from "@webiny/aws-sdk/client-sqs";
import { SendMessageCommand } from "@webiny/aws-sdk/client-sqs";
import type { ISQSTransfer, ISQSTransferSendParams } from "./types";

export interface ISQSTransferParams {
    client: SQSClient;
    url: string;
}

export class SQSTransfer implements ISQSTransfer {
    private readonly client: SQSClient;
    private readonly url: string;

    public constructor(params: ISQSTransferParams) {
        this.client = params.client;
        this.url = params.url;
    }

    public async send(params: ISQSTransferSendParams): Promise<void> {
        try {
            const input: SendMessageCommandInput = {
                QueueUrl: this.url,
                MessageBody: params.body,
                DelaySeconds: 0,
                MessageAttributes: this.getMessageAttributes(params.attributes),
                MessageGroupId: params.groupId,
                MessageDeduplicationId: params.deduplicationId
            };
            const cmd = new SendMessageCommand(input);
            await this.client.send(cmd);
        } catch (ex) {
            console.error("Failed to send a message to SQS.");
            console.log(ex);
            throw ex;
        }
    }

    private getMessageAttributes(
        attributes: ISQSTransferSendParams["attributes"]
    ): Record<string, MessageAttributeValue> | undefined {
        if (!attributes?.length) {
            return undefined;
        }
        return attributes.reduce<Record<string, MessageAttributeValue>>((attributes, item) => {
            attributes[item.name] = {
                DataType: "String",
                StringValue: item.value
            };

            return attributes;
        }, {});
    }
}

export const createSQSTransfer = (params: ISQSTransferParams): ISQSTransfer => {
    return new SQSTransfer(params);
};
