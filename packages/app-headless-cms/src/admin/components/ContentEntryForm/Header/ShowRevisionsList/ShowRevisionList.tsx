import React from "react";
import { ReactComponent as ListIcon } from "@material-design-icons/svg/outlined/checklist.svg";
import { ContentEntryEditorConfig } from "~/admin/config/contentEntries";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/useContentEntry";
import { featureFlags } from "@webiny/feature-flags";
import { useFullScreenContentEntry } from "~/admin/views/contentEntries/ContentEntry/FullScreenContentEntry/useFullScreenContentEntry";

export const ShowRevisionList = () => {
    const { openRevisionList } = useFullScreenContentEntry();
    const { entry, loading } = useContentEntry();
    const { useOptionsMenuItem } = ContentEntryEditorConfig.Actions.MenuItemAction;
    const { OptionsMenuItem } = useOptionsMenuItem();

    if (!featureFlags.allowCmsFullScreenEditor) {
        return null;
    }

    return (
        <OptionsMenuItem
            icon={<ListIcon />}
            label={"Show entry revisions"}
            onAction={() => openRevisionList(true)}
            disabled={!entry.id || loading}
            data-testid={"cms.content-form.header.show-revisions"}
        />
    );
};
