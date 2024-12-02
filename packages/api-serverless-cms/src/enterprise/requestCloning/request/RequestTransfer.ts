import { compress } from "@webiny/utils/compression/gzip";
import type { ISQSTransfer } from "../sqs/types";
import type { IS3Transfer, IS3TransferSendResult } from "../s3/types";
import type {
    IRequestTransfer,
    IRequestTransferSendParams,
    IRequestTransferSendResult
} from "./types";
import { format as formatDate } from "date-fns";

/**
 * There are few steps we must go through:
 * 1. compress the request body
 * 2. store the compressed request body in S3
 * 3. send a message to SQS with the location of the compressed request body in S3
 */

export interface ITransferRequestParams {
    s3: IS3Transfer;
    sqs: ISQSTransfer;
}

export class RequestTransfer implements IRequestTransfer {
    private readonly s3: IS3Transfer;
    private readonly sqs: ISQSTransfer;

    public constructor(params: ITransferRequestParams) {
        this.s3 = params.s3;
        this.sqs = params.sqs;
    }

    public async send(params: IRequestTransferSendParams): Promise<IRequestTransferSendResult> {
        const { event } = params;
        const body = await compress(JSON.stringify(event));

        const key = this.createRequestTransferKey(params);

        let result: IS3TransferSendResult;
        try {
            result = await this.s3.send({
                key,
                body
            });
        } catch (ex) {
            console.error("Failed to store the request in S3.");
            console.log(ex);
            return;
        }

        try {
            await this.sqs.send({
                body: JSON.stringify({
                    type: result.type,
                    value: result.key
                }),
                attributes: [
                    {
                        name: "ETag",
                        value: result.eTag
                    }
                ],
                groupId: "systemAToSystemB"
            });
        } catch (ex) {
            console.error("Failed to send a message to SQS.");
            console.log(ex);
        }
    }

    private createRequestTransferKey(params: Pick<IRequestTransferSendParams, "key">): string {
        const formattedDate = formatDate(new Date(), "yyyy/MM/dd");
        const formattedTime = formatDate(new Date(), "HH:mm:ss");
        return `requests/${formattedDate}/${formattedTime}/${params.key}.json.gz`;
    }
}

export const createRequestTransfer = (params: ITransferRequestParams): IRequestTransfer => {
    return new RequestTransfer(params);
};
