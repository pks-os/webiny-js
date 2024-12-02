import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { getDocumentClient, QueryCommand, unmarshall } from "@webiny/aws-sdk/client-dynamodb";
import type { GenericRecord } from "~/types";

export interface ServiceManifest {
    name: string;
    manifest: Manifest;
}

export type Manifest = GenericRecord<string>;

class ServiceManifestLoader {
    private client: DynamoDBDocument | undefined;
    private manifest: Manifest | undefined = undefined;

    async load<T extends Manifest = Manifest>(): Promise<T | undefined> {
        if (this.manifest) {
            return this.manifest as T;
        }

        const manifests = await this.loadManifests();

        if (!manifests) {
            return undefined;
        }

        /**
         * Service manifests are already merged by unique names in the database, so we only need to construct
         * a final object containing all manifests by name.
         */
        this.manifest = manifests.reduce((acc, manifest) => {
            return { ...acc, [manifest.name]: manifest.manifest };
        }, {});

        return this.manifest as T;
    }

    setDocumentClient(client: DynamoDBDocument) {
        this.client = client;
    }

    private async loadManifests(): Promise<ServiceManifest[] | undefined> {
        const client = this.client || getDocumentClient();
        const { Items } = await client.send(
            new QueryCommand({
                TableName: String(process.env.DB_TABLE),
                IndexName: "GSI1",
                KeyConditionExpression: "GSI1_PK = :GSI1_PK AND GSI1_SK > :GSI1_SK",
                ExpressionAttributeValues: {
                    ":GSI1_PK": { S: `SERVICE_MANIFESTS` },
                    ":GSI1_SK": { S: " " }
                }
            })
        );

        if (!Array.isArray(Items)) {
            return undefined;
        }

        return Items.map(item => unmarshall(item).data);
    }
}

const serviceManifestLoader = new ServiceManifestLoader();

export class ServiceDiscovery {
    static setDocumentClient(client: DynamoDBDocument): void {
        serviceManifestLoader.setDocumentClient(client);
    }

    static async load<T extends Manifest = Manifest>() {
        return serviceManifestLoader.load<T>();
    }
}
