import * as React from "react";
import { ReactComponent as PageIcon } from "@material-design-icons/svg/outlined/article.svg";

import PageForm from "./PageForm";
import { PbMenuItemPlugin } from "../../../../types";

const plugin: PbMenuItemPlugin = {
    name: "pb-menu-item-page",
    type: "pb-menu-item",
    menuItem: {
        type: "page",
        title: "Page",
        icon: <PageIcon />,
        canHaveChildren: false,
        renderForm(props) {
            return <PageForm {...props} />;
        }
    }
};

export default plugin;
