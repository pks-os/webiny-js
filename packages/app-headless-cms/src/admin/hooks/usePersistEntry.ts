import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import { CmsContentEntry } from "@webiny/app-headless-cms-common/types";
import { PartialCmsContentEntryWithId } from "~/admin/contexts/Cms";
import { useCallback } from "react";

interface UsePersistEntryOptions {
    addItemToListCache?: boolean;
}

interface PersistEntryOptions {
    skipValidators?: string[];
}

export function usePersistEntry({ addItemToListCache }: UsePersistEntryOptions) {
    const contentEntry = useContentEntry();

    const persistEntry = useCallback(
        (entry: Partial<CmsContentEntry>, persistOptions?: PersistEntryOptions) => {
            const isLocked = entry.meta?.locked === true;

            if (!entry.id) {
                return contentEntry.createEntry({
                    entry,
                    options: {
                        skipValidators: persistOptions?.skipValidators,
                        addItemToListCache
                    }
                });
            }

            if (!isLocked) {
                return contentEntry.updateEntryRevision({
                    entry: entry as PartialCmsContentEntryWithId,
                    options: { skipValidators: persistOptions?.skipValidators }
                });
            }

            const { id, ...input } = entry;

            return contentEntry.createEntryRevisionFrom({
                id,
                input,
                options: { skipValidators: persistOptions?.skipValidators }
            });
        },
        [addItemToListCache]
    );

    return { persistEntry };
}
