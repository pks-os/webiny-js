import React from "react";
import { Typography } from "@webiny/ui/Typography";
import { useModel } from "~/admin/components/ModelProvider";
import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import { BackButton } from "./BackButton";
import { PageMeta, PageTitle, PageVersion, TitleWrapper } from "./FullScreenContentEntry.styled";

export const OverlayLeftBar = () => {
    const { model } = useModel();
    const { entry } = useContentEntry();

    if (!entry.meta || !model) {
        return null;
    }

    return (
        <>
            <BackButton />
            <TitleWrapper>
                <PageMeta>
                    <Typography
                        use={"overline"}
                    >{`Model: ${model.name} (status: ${entry.meta.status})`}</Typography>
                </PageMeta>
                <div style={{ width: "100%", display: "flex" }}>
                    <PageTitle>{entry.meta.title}</PageTitle>
                    <PageVersion>{`(v${entry.meta.version})`}</PageVersion>
                </div>
            </TitleWrapper>
        </>
    );
};
