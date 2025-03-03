import { ContextPlugin } from "@webiny/api";
import { CmsContext } from "@webiny/api-headless-cms/types";

export const createDummyLocales = () => {
    const plugin = new ContextPlugin<CmsContext>(async context => {
        const { i18n, security } = context;

        await security.withoutAuthorization(async () => {
            await security.authenticate("");
            const [items] = await i18n.locales.listLocales({
                where: {}
            });
            if (items.length > 0) {
                return;
            }
            await i18n.locales.createLocale({
                code: "en-US",
                default: true
            });
            await i18n.locales.createLocale({
                code: "de-DE",
                default: true
            });
        });
    });

    plugin.name = "headlessCmsDdbEs.context.createDummyLocales";
    return plugin;
};
