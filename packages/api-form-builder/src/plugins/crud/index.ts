import { FormBuilderContext, FormBuilderStorageOperations } from "~/types";
import { ContextPlugin } from "@webiny/api";
import { createSystemCrud } from "~/plugins/crud/system.crud";
import { createSettingsCrud } from "~/plugins/crud/settings.crud";
import { createFormsCrud } from "~/plugins/crud/forms.crud";
import { createSubmissionsCrud } from "~/plugins/crud/submissions.crud";
import WebinyError from "@webiny/error";
import { FormsPermissions } from "./permissions/FormsPermissions";
import { SettingsPermissions } from "~/plugins/crud/permissions/SettingsPermissions";

export interface CreateFormBuilderCrudParams {
    storageOperations: FormBuilderStorageOperations;
}

export default (params: CreateFormBuilderCrudParams) => {
    const { storageOperations } = params;

    return [
        new ContextPlugin<FormBuilderContext>(async context => {
            const getLocale = () => {
                const locale = context.i18n.getContentLocale();
                if (!locale) {
                    throw new WebinyError(
                        "Missing locale on context.i18n locale in API Form Builder.",
                        "LOCALE_ERROR"
                    );
                }
                return locale;
            };

            const getIdentity = () => {
                return context.security.getIdentity();
            };

            const getTenant = () => {
                return context.tenancy.getCurrentTenant();
            };

            if (storageOperations.beforeInit) {
                try {
                    await storageOperations.beforeInit(context);
                } catch (ex) {
                    throw new WebinyError(
                        ex.message ||
                            "Could not run before init in Form Builder storage operations.",
                        ex.code || "STORAGE_OPERATIONS_BEFORE_INIT_ERROR",
                        {
                            ...ex
                        }
                    );
                }
            }

            const basePermissionsArgs = {
                getIdentity,
                fullAccessPermissionName: "fb.*"
            };

            const formsPermissions = new FormsPermissions({
                ...basePermissionsArgs,
                getPermissions: () => context.security.getPermissions("fb.form")
            });

            const settingsPermissions = new SettingsPermissions({
                ...basePermissionsArgs,
                getPermissions: () => context.security.getPermissions("fb.settings")
            });

            context.formBuilder = {
                storageOperations,
                ...createSystemCrud({
                    getIdentity,
                    getTenant,
                    getLocale,
                    context
                }),
                ...createSettingsCrud({
                    getTenant,
                    getLocale,
                    settingsPermissions,
                    context
                }),
                ...createFormsCrud({
                    getTenant,
                    getLocale,
                    formsPermissions,
                    context
                }),
                ...createSubmissionsCrud({
                    context,
                    formsPermissions
                })
            };

            if (!storageOperations.init) {
                return;
            }
            try {
                await storageOperations.init(context);
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not run init in Form Builder storage operations.",
                    ex.code || "STORAGE_OPERATIONS_INIT_ERROR",
                    {
                        ...ex
                    }
                );
            }
        }),

        // Once a new locale is created, we need to create a new settings entry for it.
        new ContextPlugin<FormBuilderContext>(async context => {
            context.i18n.locales.onLocaleAfterCreate.subscribe(async params => {
                // We don't want to auto-create the settings entry if Form Builder is not installed.
                // This is because the entry will be created by the app's installer.
                const fbIsInstalled = Boolean(await context.formBuilder.getSystemVersion());
                if (!fbIsInstalled) {
                    return;
                }
                const { locale } = params;
                await context.i18n.withLocale(locale, async () => {
                    return context.formBuilder.createSettings({});
                });
            });

            context.i18n.locales.onLocaleAfterDelete.subscribe(async params => {
                const { locale } = params;
                await context.i18n.withLocale(locale, async () => {
                    return context.formBuilder.deleteSettings();
                });
            });
        })
    ];
};
