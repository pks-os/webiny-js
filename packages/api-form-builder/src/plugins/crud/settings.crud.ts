import {
    FormBuilder,
    FormBuilderContext,
    OnSettingsAfterCreate,
    OnSettingsAfterDelete,
    OnSettingsAfterUpdate,
    OnSettingsBeforeCreate,
    OnSettingsBeforeDelete,
    OnSettingsBeforeUpdate,
    Settings,
    SettingsCRUD
} from "~/types";
import WebinyError from "@webiny/error";
import { Tenant } from "@webiny/api-tenancy/types";
import { I18NLocale } from "@webiny/api-i18n/types";
import { NotFoundError } from "@webiny/handler-graphql";
import { createTopic } from "@webiny/pubsub";
import { SettingsPermissions } from "./permissions/SettingsPermissions";
import { createSettingsValidation, updateSettingsValidation } from "~/plugins/crud/settings.models";
import { createZodError } from "@webiny/utils";

export interface CreateSettingsCrudParams {
    getTenant: () => Tenant;
    getLocale: () => I18NLocale;
    settingsPermissions: SettingsPermissions;
    context: FormBuilderContext;
}

export const createSettingsCrud = (params: CreateSettingsCrudParams): SettingsCRUD => {
    const { getTenant, getLocale, settingsPermissions } = params;

    // create
    const onSettingsBeforeCreate = createTopic<OnSettingsBeforeCreate>(
        "formBuilder.onSettingsBeforeCreate"
    );
    const onSettingsAfterCreate = createTopic<OnSettingsAfterCreate>(
        "formBuilder.onSettingsAfterCreate"
    );

    // update
    const onSettingsBeforeUpdate = createTopic<OnSettingsBeforeUpdate>(
        "formBuilder.onSettingsBeforeUpdate"
    );
    const onSettingsAfterUpdate = createTopic<OnSettingsAfterUpdate>(
        "formBuilder.onSettingsAfterUpdate"
    );

    // delete
    const onSettingsBeforeDelete = createTopic<OnSettingsBeforeDelete>(
        "formBuilder.onSettingsBeforeDelete"
    );
    const onSettingsAfterDelete = createTopic<OnSettingsAfterDelete>(
        "formBuilder.onSettingsAfterDelete"
    );

    return {
        onSettingsBeforeCreate,
        onSettingsAfterCreate,
        onSettingsBeforeUpdate,
        onSettingsAfterUpdate,
        onSettingsBeforeDelete,
        onSettingsAfterDelete,
        async getSettings(this: FormBuilder, params) {
            const { auth, throwOnNotFound } = params || {};

            if (auth !== false) {
                await settingsPermissions.ensure();
            }

            let settings: Settings | null = null;
            try {
                settings = await this.storageOperations.getSettings({
                    tenant: getTenant().id,
                    locale: getLocale().code
                });
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not load settings.",
                    ex.code || "GET_SETTINGS_ERROR"
                );
            }
            if (throwOnNotFound === true && !settings) {
                throw new NotFoundError(`"Form Builder" settings not found!`);
            }
            return settings;
        },
        async createSettings(this: FormBuilder, input) {
            const validation = createSettingsValidation.safeParse(input);
            if (!validation.success) {
                throw createZodError(validation.error);
            }

            const data = validation.data;

            const original = await this.getSettings({ auth: false });
            if (original) {
                throw new WebinyError(
                    `"Form Builder" settings already exist.`,
                    "FORM_BUILDER_SETTINGS_CREATE_ERROR",
                    {
                        settings: original
                    }
                );
            }
            /**
             * Assign specific properties, just to be sure nothing else gets in the record.
             */
            const settings: Settings = {
                domain: data.domain,
                reCaptcha: data.reCaptcha,
                tenant: getTenant().id,
                locale: getLocale().code
            };
            try {
                await onSettingsBeforeCreate.publish({
                    settings
                });
                const result = await this.storageOperations.createSettings({
                    settings
                });
                await onSettingsAfterCreate.publish({
                    settings: result
                });
                return result;
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not create settings.",
                    ex.code || "CREATE_SETTINGS_ERROR",
                    {
                        settings,
                        input
                    }
                );
            }
        },
        async updateSettings(this: FormBuilder, input) {
            await settingsPermissions.ensure();

            const validation = updateSettingsValidation.safeParse(input);
            if (!validation.success) {
                throw createZodError(validation.error);
            }

            const original = await this.getSettings();
            if (!original) {
                throw new NotFoundError(`"Form Builder" settings not found!`);
            }
            const data = validation.data;
            /**
             * Assign specific properties, just to be sure nothing else gets in the record.
             */
            const settings = Object.keys(data).reduce<Settings>(
                (collection, key) => {
                    // @ts-expect-error
                    if (data[key] === undefined) {
                        return collection;
                    }
                    // @ts-expect-error
                    collection[key] = data[key];
                    return collection;
                },
                {
                    ...original,
                    tenant: getTenant().id,
                    locale: getLocale().code
                }
            );
            try {
                await onSettingsBeforeUpdate.publish({
                    original,
                    settings
                });
                const result = await this.storageOperations.updateSettings({
                    settings,
                    original
                });

                await onSettingsAfterUpdate.publish({
                    original,
                    settings
                });

                return result;
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not update settings.",
                    ex.code || "UPDATE_SETTINGS_ERROR",
                    {
                        settings,
                        original
                    }
                );
            }
        },
        async deleteSettings(this: FormBuilder) {
            await settingsPermissions.ensure();

            const settings = await this.getSettings();
            if (!settings) {
                return;
            }
            try {
                await onSettingsBeforeDelete.publish({
                    settings
                });

                await this.storageOperations.deleteSettings({ settings });

                await onSettingsAfterDelete.publish({
                    settings
                });
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not delete settings.",
                    ex.code || "DELETE_SETTINGS_ERROR"
                );
            }
        }
    };
};
