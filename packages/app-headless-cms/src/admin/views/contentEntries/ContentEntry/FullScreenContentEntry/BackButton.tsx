import React from "react";
import { ReactComponent as BackIcon } from "@material-design-icons/svg/round/arrow_back.svg";
import { useNavigateFolder } from "@webiny/app-aco";
import { IconButton } from "@webiny/ui/Button";
import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import { BackButtonWrapper } from "./FullScreenContentEntry.styled";

export const BackButton = () => {
    const { navigateToFolder } = useNavigateFolder();
    const { entry } = useContentEntry();

    if (!entry) {
        return null;
    }

    return (
        <BackButtonWrapper>
            <IconButton
                onClick={() => navigateToFolder(entry.wbyAco_location.folderId)}
                icon={<BackIcon />}
            />
        </BackButtonWrapper>
    );
};
