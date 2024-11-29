import { ServiceDiscovery } from "@webiny/api";

export interface IOptions {
    sqsRegion: string;
    sqsUrl: string;
    s3Region: string;
    s3Bucket: string;
}

interface IManifestApiTwoPhasedDeployment {
    isPrimary: boolean;
    s3Region: string;
    s3Bucket: string;
    sqsRegion: string;
    sqsUrl: string;
}

interface IManifestApi {
    twoPhasedDeployment: IManifestApiTwoPhasedDeployment;
}

interface IManifest {
    api: IManifestApi;
}

export const getOptions = async (): Promise<IOptions | null> => {
    const manifest = (await ServiceDiscovery.load()) as IManifest | undefined;
    if (!manifest) {
        console.error("Service manifest not found.");
        return null;
    }

    const { twoPhasedDeployment } = manifest.api;

    if (!twoPhasedDeployment.isPrimary) {
        return null;
    }

    const result: Partial<IOptions> = {};
    const keys = ["sqsRegion", "sqsUrl", "s3Region", "s3Bucket"] as const;
    for (const key of keys) {
        if (!twoPhasedDeployment[key]) {
            console.log(`${key} is not set.`);
            return null;
        }
        result[key] = twoPhasedDeployment[key];
    }
    return result as IOptions;
};
