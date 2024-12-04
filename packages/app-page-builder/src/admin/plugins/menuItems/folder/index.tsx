import * as React from "react";
import { ReactComponent as FolderIcon } from "@material-design-icons/svg/filled/folder.svg";

import FolderForm from "./FolderForm";
import { PbMenuItemPlugin } from "../../../../types";

const plugin: PbMenuItemPlugin = {
    name: "pb-menu-item-folder",
    type: "pb-menu-item",
    menuItem: {
        type: "folder",
        title: "Folder",
        icon: <FolderIcon />,
        canHaveChildren: true,
        renderForm(props) {
            return <FolderForm {...props} />;
        }
    }
};

export default plugin;
