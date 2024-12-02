import { createModifyFastifyPlugin } from "@webiny/handler";
import { createSqsClient } from "@webiny/aws-sdk/client-sqs";
import { createS3Client } from "@webiny/aws-sdk/client-s3";
import { getOptions } from "./options";
import { createCacheKey } from "@webiny/utils";
import { createS3Transfer } from "./s3";
import { createSQSTransfer } from "./sqs";
import { createRequestTransfer } from "./request";

export const requestCloning = () => {
    return createModifyFastifyPlugin(instance => {
        instance.addHook("onRequest", async request => {
            // @ts-expect-error
            request.cloning = (async () => {
                /**
                 * We will not transfer OPTIONS request. Everything else can go into another system.
                 */
                if (request.method.toLowerCase() === "options") {
                    return;
                }
                const event = request.awsLambda?.event;
                if (!event) {
                    console.error(`There is no event to be transferred into another system.`);
                    return;
                }
                const lambdaContext = request.awsLambda?.context;
                if (!lambdaContext) {
                    console.error(`There is no context to be transferred into another system.`);
                    return;
                }
                const options = await getOptions();
                if (!options) {
                    /**
                     * If no options, either there is some error in the options validation or this system is not primary.
                     * In both cases, we will skip the transfer.
                     */
                    return;
                }

                const s3Transfer = createS3Transfer({
                    client: createS3Client({
                        region: options.s3Region
                    }),
                    bucket: options.s3Bucket
                });
                const sqsTransfer = createSQSTransfer({
                    client: createSqsClient({
                        region: options.sqsRegion
                    }),
                    url: options.sqsUrl
                });

                const requestTransfer = createRequestTransfer({
                    s3: s3Transfer,
                    sqs: sqsTransfer
                });

                const key = createCacheKey(event, {
                    algorithm: "sha512"
                });

                try {
                    await requestTransfer.send({
                        key,
                        event
                    });
                } catch (ex) {
                    console.error("Failed to transfer the request to another system.");
                    console.log(ex);
                    throw ex;
                }
            })();
        });
    });
};
