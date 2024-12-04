import zod from "zod";
import { ContextPlugin } from "@webiny/api";
import { CmsGraphQLSchemaPlugin } from "@webiny/api-headless-cms";
import { validateConfirmation } from "../helpers/confirmation";
import { HcmsTasksContext } from "~/types";
import { resolve } from "@webiny/handler-graphql";
import { fullyDeleteModel } from "~/tasks/deleteModel/graphql/fullyDeleteModel";
import { createZodError } from "@webiny/utils";
import { IDeleteModelTaskInput, IDeleteModelTaskOutput } from "~/tasks/deleteModel/types";
import { ITask } from "@webiny/tasks";

const validation = zod
    .object({
        modelId: zod.string(),
        confirmation: zod.string()
    })
    .refine(
        schema => {
            return validateConfirmation(schema);
        },
        {
            message: `Confirmation input does not match the generated one.`
        }
    )
    .readonly();

export const createDeleteModelGraphQl = <T extends HcmsTasksContext = HcmsTasksContext>() => {
    const contextPlugin = new ContextPlugin<T>(async context => {
        const plugin = new CmsGraphQLSchemaPlugin<T>({
            typeDefs: /* GraphQL */ `
                type FullyDeleteCmsModelResponse {
                    data: WebinyBackgroundTask
                    error: CmsError
                }

                extend type Mutation {
                    fullyDeleteModel(
                        modelId: ID!
                        confirmation: String!
                    ): FullyDeleteCmsModelResponse!
                }
            `,
            resolvers: {
                Mutation: {
                    fullyDeleteModel: async (_, args, ctx) => {
                        return resolve<ITask<IDeleteModelTaskInput, IDeleteModelTaskOutput>>(
                            async () => {
                                const input = validation.safeParse(args);
                                if (input.error) {
                                    throw createZodError(input.error);
                                }
                                return await fullyDeleteModel({
                                    context: ctx,
                                    modelId: input.data.modelId,
                                    confirmation: input.data.confirmation
                                });
                            }
                        );
                    }
                }
            }
        });
        plugin.name = "headless-cms.graphql.fullyDeleteModel";
        context.plugins.register(plugin);
    });
    contextPlugin.name = "headless-cms.context.createDeleteModelGraphQl";
    return contextPlugin;
};
