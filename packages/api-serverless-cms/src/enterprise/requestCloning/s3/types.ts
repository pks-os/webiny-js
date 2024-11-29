export interface IS3TransferSendParams {
    key: string;
    body: string | Buffer;
}
export interface IS3TransferSendResult {
    key: string;
    eTag: string;
    statusCode: 200 | unknown;
}
export interface IS3Transfer {
    send(params: IS3TransferSendParams): Promise<IS3TransferSendResult>;
}
