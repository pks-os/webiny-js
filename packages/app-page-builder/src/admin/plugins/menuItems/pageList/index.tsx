import * as React from "react";
import { ReactComponent as PageListIcon } from "@material-design-icons/svg/filled/format_list_bulleted.svg";

import PageListForm from "./PageListForm";
import { PbMenuItemPlugin } from "../../../../types";

const plugin: PbMenuItemPlugin = {
    name: "pb-menu-item-page-list",
    type: "pb-menu-item",
    menuItem: {
        type: "pages-list",
        title: "Page list",
        icon: <PageListIcon />,
        canHaveChildren: false,
        renderForm(props) {
            return <PageListForm {...props} />;
        }
    }
};

export default plugin;
