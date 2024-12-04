import React, { useRef, useState } from "react";
import { ModelProvider, useModel } from "~/admin/components/ModelProvider";
import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import { useGoToRevision } from "~/admin/components/ContentEntryForm/useGoToRevision";
import { usePersistEntry } from "~/admin/hooks/usePersistEntry";
import { CmsContentEntry } from "@webiny/app-headless-cms-common/types";
import { useFormRenderer } from "~/admin/components/ContentEntryForm/useFormRenderer";
import { featureFlags } from "@webiny/feature-flags";
import { ContentEntryFormProvider } from "~/admin/components/ContentEntryForm/ContentEntryFormProvider";
import { OverlayLayout } from "@webiny/app-admin";
import { Header } from "~/admin/components/ContentEntryForm/Header";
import { CircularProgress } from "@webiny/ui/Progress";
import { Elevation } from "@webiny/ui/Elevation";
import { CustomLayout } from "~/admin/components/ContentEntryForm/CustomLayout";
import { DefaultLayout } from "~/admin/components/ContentEntryForm/DefaultLayout";
import { ContentEntry } from "~/admin/views/contentEntries/ContentEntry";
import { OverlayLeftBar } from "./OverlayLeftBar";
import {
    DetailsContainer,
    FormWrapper,
    FullScreenContentEntryContainer
} from "./FullScreenContentEntry.styled";
import { RevisionListDrawer } from "./RevisionListDrawer";
import { FullScreenContentEntryProvider } from "./useFullScreenContentEntry";

export const FullScreenContentEntry = ContentEntry.createDecorator(Original => {
    return function ContentEntry() {
        if (!featureFlags.allowCmsFullScreenEditor) {
            return <Original />;
        }

        const { model } = useModel();
        const { entry, loading } = useContentEntry();
        const { goToRevision } = useGoToRevision();
        const { persistEntry } = usePersistEntry({ addItemToListCache: true });
        const defaultOnAfterCreate = (entry: CmsContentEntry) => {
            goToRevision(entry.id);
        };
        const formRenderer = useFormRenderer(model);
        const formElementRef = useRef<HTMLDivElement>(null);
        const [isRevisionListOpen, openRevisionList] = useState<boolean>(false);

        return (
            <FullScreenContentEntryProvider
                openRevisionList={openRevisionList}
                isRevisionListOpen={isRevisionListOpen}
            >
                <FullScreenContentEntryContainer>
                    <ContentEntryFormProvider
                        model={model}
                        entry={entry}
                        onAfterCreate={defaultOnAfterCreate}
                        confirmNavigationIfDirty={true}
                        persistEntry={persistEntry}
                    >
                        <ModelProvider model={model}>
                            <OverlayLayout
                                barLeft={<OverlayLeftBar />}
                                barRight={<Header />}
                                showExitButton={false}
                                transitionTimeout={0}
                                style={{
                                    transform: "none",
                                    opacity: 1
                                }}
                            >
                                {loading && (
                                    <CircularProgress
                                        label={`Loading the ${model.name}...`}
                                        style={{ zIndex: 30 }}
                                    />
                                )}
                                <DetailsContainer data-testid="cms-content-details">
                                    <FormWrapper
                                        data-testid={"cms-content-form"}
                                        ref={formElementRef}
                                    >
                                        <Elevation z={2} style={{ position: "relative" }}>
                                            {formRenderer ? (
                                                <CustomLayout
                                                    model={model}
                                                    formRenderer={formRenderer}
                                                />
                                            ) : (
                                                <DefaultLayout model={model} />
                                            )}
                                        </Elevation>
                                    </FormWrapper>
                                </DetailsContainer>
                            </OverlayLayout>
                            <RevisionListDrawer />
                        </ModelProvider>
                    </ContentEntryFormProvider>
                </FullScreenContentEntryContainer>
            </FullScreenContentEntryProvider>
        );
    };
});
