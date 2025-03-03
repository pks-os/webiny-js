import { ContextPlugin } from "@webiny/api";
import { SecurityIdentity, SecurityPermission } from "@webiny/api-security/types";
import {
    createAuthenticator,
    Config as CognitoConfig,
    TokenData
} from "@webiny/api-cognito-authenticator";
import { createGroupsTeamsAuthorizerHandler } from "@webiny/api-security";
import { CoreContext } from "~/types";
import { createAdminUsersHooks } from "./createAdminUsersHooks";
import adminUsersGqlPlugins from "./graphql/user.gql";
import installGqlPlugins from "./graphql/install.gql";

interface GetIdentityParams<TContext, TToken, TIdentity> {
    identity: TIdentity;
    identityType: string;
    token: TToken;
    context: TContext;
}

interface GetPermissionsParams<TContext> {
    context: TContext;
}

interface Config<TContext, TToken, TIdentity> extends CognitoConfig {
    identityType: string;

    getIdentity?(params: GetIdentityParams<TContext, TToken, TIdentity>): TIdentity;

    getPermissions?(params: GetPermissionsParams<TContext>): Promise<SecurityPermission[] | null>;
}

export interface CognitoTokenData extends TokenData {
    given_name: string;
    family_name: string;
    email: string;
    "custom:id": string;

    [key: string]: any;
}

const mustAddGroupsTeamsAuthorizer = (identity: SecurityIdentity) => {
    if ("group" in identity) {
        return true;
    }

    if ("groups" in identity) {
        return true;
    }

    if ("team" in identity) {
        return true;
    }

    return "teams" in identity;
};

export const createCognito = <
    TContext extends CoreContext = CoreContext,
    TToken extends CognitoTokenData = CognitoTokenData,
    TIdentity extends SecurityIdentity = SecurityIdentity
>(
    config: Config<TContext, TToken, TIdentity>
) => {
    const cognitoAuthenticator = createAuthenticator({
        region: config.region,
        userPoolId: config.userPoolId
    });

    const { getIdentity, getPermissions } = config;
    const isAdminIdentity = config.identityType === "admin";

    return [
        new ContextPlugin<TContext>(context => {
            context.security.addAuthenticator(async token => {
                const tokenObj = await cognitoAuthenticator<TToken>(token);

                if (!tokenObj) {
                    return null;
                }

                const defaultIdentity = {
                    id: tokenObj["custom:id"] || tokenObj.sub,
                    type: config.identityType,
                    displayName: `${tokenObj.given_name} ${tokenObj.family_name}`,
                    email: tokenObj.email,
                    firstName: tokenObj.given_name,
                    lastName: tokenObj.family_name
                } as unknown as TIdentity;

                if (typeof getIdentity === "function") {
                    const customIdentity = getIdentity({
                        identity: defaultIdentity,
                        identityType: config.identityType,
                        token: tokenObj,
                        context
                    });

                    if (mustAddGroupsTeamsAuthorizer(customIdentity)) {
                        const authorizer = createGroupsTeamsAuthorizerHandler(config, context);
                        context.security.addAuthorizer(authorizer);
                    }

                    return customIdentity;
                }

                return defaultIdentity;
            });

            if (getPermissions) {
                context.security.addAuthorizer(async () => {
                    return getPermissions({ context });
                });
            }

            const teams = context.wcp.canUseTeams();
            context.plugins.register(adminUsersGqlPlugins({ teams }));
        }),
        isAdminIdentity ? [installGqlPlugins, createAdminUsersHooks()] : []
    ];
};
