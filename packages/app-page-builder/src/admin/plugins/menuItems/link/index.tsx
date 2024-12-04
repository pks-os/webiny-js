import * as React from "react";
import { ReactComponent as LinkIcon } from "@material-design-icons/svg/filled/link.svg";

import LinkForm from "./LinkForm";
import { PbMenuItemPlugin } from "../../../../types";

const plugin: PbMenuItemPlugin = {
    name: "pb-menu-item-link",
    type: "pb-menu-item",
    menuItem: {
        type: "link",
        title: "Link",
        icon: <LinkIcon />,
        canHaveChildren: false,
        renderForm(props) {
            return <LinkForm {...props} />;
        }
    }
};

export default plugin;
