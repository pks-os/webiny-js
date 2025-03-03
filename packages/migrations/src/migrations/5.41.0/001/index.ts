import { Table } from "@webiny/db-dynamodb/toolbox";
import { DataMigrationContext } from "@webiny/data-migration";
import { PrimaryDynamoTableSymbol } from "@webiny/data-migration/symbols";
import { queryAll, queryOne } from "~/utils";
import { createTenantEntity } from "./createTenantEntity";
import { createUserEntity } from "./createUserEntity";
import { inject, makeInjectable } from "@webiny/ioc";
import { executeWithRetry } from "@webiny/utils";
import { createEntityWriteBatch } from "@webiny/db-dynamodb";

export class AdminUsers_5_41_0_001 {
    private readonly newUserEntity: ReturnType<typeof createUserEntity>;
    private readonly tenantEntity: ReturnType<typeof createTenantEntity>;

    constructor(table: Table<string, string, string>) {
        this.newUserEntity = createUserEntity(table);
        this.tenantEntity = createTenantEntity(table);
    }

    getId() {
        return "5.41.0-001";
    }

    getDescription() {
        return "Introduce 'groups' and 'teams` properties (old 'group' and 'team' are no longer in use)";
    }

    async shouldExecute({ logger }: DataMigrationContext): Promise<boolean> {
        const user = await queryOne<{ data: any }>({
            entity: this.newUserEntity,
            partitionKey: `T#root#ADMIN_USERS`,
            options: {
                index: "GSI1",
                gt: " "
            }
        });

        if (!user) {
            logger.info(`No users were found; skipping migration.`);
            return false;
        }

        if (Array.isArray(user.data.groups)) {
            logger.info(`User records seems to be in order; skipping migration.`);
            return false;
        }

        return true;
    }

    async execute({ logger }: DataMigrationContext): Promise<void> {
        const tenants = await queryAll<{ data: { id: string; name: string } }>({
            entity: this.tenantEntity,
            partitionKey: "TENANTS",
            options: {
                index: "GSI1",
                gt: " "
            }
        });

        for (const tenant of tenants) {
            const users = await queryAll<{ id: string; email: string; data?: any }>({
                entity: this.newUserEntity,
                partitionKey: `T#${tenant.data.id}#ADMIN_USERS`,
                options: {
                    index: "GSI1",
                    gt: " "
                }
            });

            if (users.length === 0) {
                logger.info(`No users found on tenant "${tenant.data.id}".`);
                continue;
            }

            const newUsersEntityBatch = createEntityWriteBatch({
                entity: this.newUserEntity,
                put: users
                    .filter(user => !Array.isArray(user.data.groups))
                    .map(user => {
                        return {
                            ...user,
                            data: {
                                ...user.data,
                                groups: [user.data.group].filter(Boolean),
                                teams: [user.data.team].filter(Boolean)
                            }
                        };
                    })
            });

            await executeWithRetry(async () => {
                return await newUsersEntityBatch.execute();
            });
        }
    }
}

makeInjectable(AdminUsers_5_41_0_001, [inject(PrimaryDynamoTableSymbol)]);
