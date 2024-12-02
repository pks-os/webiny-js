import { ServiceDiscovery } from "@webiny/api";
import zod from "zod";

export interface IOptions {
    sqsRegion: string;
    sqsUrl: string;
    s3Region: string;
    s3Bucket: string;
}

interface IManifestTwoPhasedDeployment {
    isPrimary: boolean;
    s3Region: string;
    s3Bucket: string;
    sqsRegion: string;
    sqsUrl: string;
}

interface IManifest {
    twoPhasedDeployment: IManifestTwoPhasedDeployment;
}

const optionsValidation = zod.object({
    twoPhasedDeployment: zod.object({
        isPrimary: zod.boolean(),
        s3Region: zod.string(),
        s3Bucket: zod.string(),
        sqsRegion: zod.string(),
        sqsUrl: zod.string()
    })
});

export const getOptions = async (): Promise<IOptions | null> => {
    const manifest = await ServiceDiscovery.load<IManifest>();
    if (!manifest) {
        console.error("Service manifest not found.");
        return null;
    }

    const validated = await optionsValidation.safeParseAsync(manifest);
    if (!validated.success || !validated.data) {
        console.error("Service manifest is not valid.");
        console.log(validated.error);
        return null;
    }

    const { twoPhasedDeployment } = validated.data;

    if (!twoPhasedDeployment?.isPrimary) {
        return null;
    }
    return twoPhasedDeployment;
};
