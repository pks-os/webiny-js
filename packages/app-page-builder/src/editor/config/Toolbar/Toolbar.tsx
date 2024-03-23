import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Element as BaseElement, ElementProps as BaseElementProps } from "../Element";
import { Layout } from "./Layout";
import {
    Elements as BaseElements,
    ElementsProps as BaseElementsProps
} from "~/editor/config/Elements";
import { DrawersProvider } from "./DrawersProvider";
import { DrawerTrigger } from "./DrawerTrigger";
import { Drawer } from "./Drawer";
import { IconButton } from "./IconButton";

const SCOPE = "toolbar";

const BaseToolbar = () => {
    return (
        <DrawersProvider>
            <Layout />
        </DrawersProvider>
    );
};

export type ElementProps = Omit<BaseElementProps, "scope">;

const BaseToolbarElement = makeDecoratable("ToolbarElement", (props: ElementProps) => {
    return <BaseElement {...props} scope={SCOPE} />;
});

export type ElementsProps = Omit<BaseElementsProps, "scope">;

const Elements = makeDecoratable("ToolbarElements", (props: ElementsProps) => {
    return <BaseElements {...props} scope={SCOPE} />;
});

export const Toolbar = Object.assign(BaseToolbar, {
    Layout,
    Element: Object.assign(BaseToolbarElement, { DrawerTrigger, Drawer, IconButton }),
    Elements
});
