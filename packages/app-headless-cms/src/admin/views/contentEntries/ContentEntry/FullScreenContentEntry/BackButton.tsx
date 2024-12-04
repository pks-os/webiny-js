import React from "react";
import { ReactComponent as BackIcon } from "@material-design-icons/svg/round/arrow_back.svg";
import { useNavigateFolder } from "@webiny/app-aco";
import { IconButton } from "@webiny/ui/Button";

export const BackButton = () => {
    const { navigateToLatestFolder } = useNavigateFolder();

    return <IconButton onClick={() => navigateToLatestFolder()} icon={<BackIcon />} />;
};
