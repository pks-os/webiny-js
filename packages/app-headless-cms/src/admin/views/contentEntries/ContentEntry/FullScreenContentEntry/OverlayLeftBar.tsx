import React, { useMemo } from "react";
import { Typography } from "@webiny/ui/Typography";
import { useModel } from "~/admin/components/ModelProvider";
import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import { BackButton } from "./BackButton";
import { EntryMeta, EntryTitle, EntryVersion, TitleWrapper } from "./FullScreenContentEntry.styled";

export const OverlayLeftBar = () => {
    const { model } = useModel();
    const { entry } = useContentEntry();

    const title = useMemo(
        () => entry?.meta?.title || `New ${model.name}`,
        [entry.meta, model.name]
    );
    const isNewEntry = useMemo(() => !entry.meta?.title, [entry.meta]);
    const version = useMemo(() => entry.meta?.version ?? null, [entry.meta]);
    const status = useMemo(() => entry.meta?.status ?? null, [entry.meta]);

    const modelName = useMemo(() => model.name, [model.name]);

    return (
        <>
            <BackButton />
            <TitleWrapper>
                <EntryMeta>
                    <Typography use="overline">
                        {`Model: ${modelName} ${status ? `(status: ${status})` : ""}`}
                    </Typography>
                </EntryMeta>
                <div style={{ width: "100%", display: "flex" }}>
                    <EntryTitle isNewEntry={isNewEntry}>{title}</EntryTitle>
                    {version && <EntryVersion>{`(v${version})`}</EntryVersion>}
                </div>
            </TitleWrapper>
        </>
    );
};
