import React, { useState } from "react";
import { ReactComponent as ListIcon } from "@material-design-icons/svg/outlined/checklist.svg";
import { ContentEntryEditorConfig } from "~/admin/config/contentEntries";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/useContentEntry";
import { featureFlags } from "@webiny/feature-flags";
import { DrawerContent, DrawerRight } from "@webiny/ui/Drawer";
import { RevisionsList } from "~/admin/views/contentEntries/ContentEntry/RevisionsList/RevisionsList";

export const ShowRevisionList = () => {
    const [open, openDrawer] = useState(false);
    const { entry, loading } = useContentEntry();

    if (!featureFlags.allowCmsFullScreenEditor) {
        return null;
    }

    const { OptionsMenuItem } =
        ContentEntryEditorConfig.Actions.MenuItemAction.useOptionsMenuItem();

    return (
        <>
            <OptionsMenuItem
                icon={<ListIcon />}
                label={"Show entry revisions"}
                onAction={() => openDrawer(true)}
                disabled={!entry.id || loading}
                data-testid={"cms.content-form.header.show-revisions"}
            />
            <DrawerRight open={open} onClose={() => openDrawer(false)} modal>
                <DrawerContent>
                    <RevisionsList />
                </DrawerContent>
            </DrawerRight>
        </>
    );
};
