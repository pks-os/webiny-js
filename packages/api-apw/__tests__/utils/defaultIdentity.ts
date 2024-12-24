import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { SecurityContext } from "@webiny/api-security/types";
import { GenericRecord } from "@webiny/api/types";

export const defaultIdentity = () => {
    return new GraphQLSchemaPlugin<SecurityContext>({
        typeDefs: /* GraphQL */ `
            type Admin implements SecurityIdentity {
                id: ID!
                type: String!
                displayName: String!
                permissions: [JSON!]!
                tenant: Tenant
                currentTenant: Tenant
                defaultTenant: Tenant
            }
        `,
        resolvers: {
            Admin: {
                __isTypeOf(obj: GenericRecord) {
                    return obj.type === "admin";
                }
            }
        }
    });
};
