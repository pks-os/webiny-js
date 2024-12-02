import { IS3Transfer, IS3TransferSendParams, IS3TransferSendResult } from "./types";
import {
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
    S3Client
} from "@webiny/aws-sdk/client-s3";
import { TRANSFER_TYPE_S3 } from "./constants";

export interface IS3TransferParams {
    client: S3Client;
    bucket: string;
}

export class S3Transfer implements IS3Transfer {
    private readonly client: S3Client;
    private readonly bucket: string;

    public constructor(params: IS3TransferParams) {
        this.client = params.client;
        this.bucket = params.bucket;
    }

    public async send(params: IS3TransferSendParams): Promise<IS3TransferSendResult> {
        let s3Result: PutObjectCommandOutput;
        try {
            const input: PutObjectCommandInput = {
                ACL: "private",
                Bucket: this.bucket,
                Key: params.key,
                Body: params.body
            };
            const cmd = new PutObjectCommand(input);
            s3Result = await this.client.send(cmd);
        } catch (ex) {
            console.error("Failed to store the request in S3.");
            console.log(ex);
            throw ex;
        }

        const statusCode = s3Result.$metadata?.httpStatusCode;
        const eTag = s3Result.ETag;

        if (statusCode !== 200 || !eTag) {
            const message = `Failed to store the request in S3. Key: ${params.key}`;
            console.error(message);
            throw new Error(message);
        }

        return {
            type: TRANSFER_TYPE_S3,
            key: params.key,
            eTag,
            statusCode
        };
    }
}

export const createS3Transfer = (params: IS3TransferParams): IS3Transfer => {
    return new S3Transfer(params);
};
