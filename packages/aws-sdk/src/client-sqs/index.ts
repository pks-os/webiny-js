import { SQSClient, SQSClientConfig as BaseSQSClientConfig } from "@aws-sdk/client-sqs";
import { createCacheKey } from "@webiny/utils";

export { SQSClient, SendMessageCommand, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
export type {
    SendMessageCommandInput,
    SendMessageCommandOutput,
    SendMessageBatchRequestEntry,
    MessageAttributeValue
} from "@aws-sdk/client-sqs";

export interface SQSClientConfig extends BaseSQSClientConfig {
    cache?: boolean;
}

const sqsClientsCache = new Map<string, SQSClient>();

export const createSqsClient = (input: Partial<SQSClientConfig>) => {
    const options: SQSClientConfig = {
        region: process.env.AWS_REGION,
        ...input
    };

    const skipCache = options.cache === false;
    delete options.cache;
    if (skipCache) {
        return new SQSClient({
            ...options
        });
    }

    const key = createCacheKey(options);
    if (sqsClientsCache.has(key)) {
        return sqsClientsCache.get(key) as SQSClient;
    }

    const instance = new SQSClient({
        ...options
    });
    sqsClientsCache.set(key, instance);

    return instance;
};
