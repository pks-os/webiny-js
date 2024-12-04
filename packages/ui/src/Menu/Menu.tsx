import React, { useMemo } from "react";
import { MenuItemProps as BaseMenuItemProps, MenuProps as RmwcMenuProps } from "@rmwc/menu";
import { DropdownMenu as AdminUiDropdownMenu } from "@webiny/admin-ui/DropdownMenu";
import { ListItemGraphic } from "@webiny/ui/List";

export type MenuChildrenFunctionProps = {
    closeMenu: () => void;
};

export interface RenderableMenuChildren {
    (props: MenuChildrenFunctionProps): React.ReactNode;
}

export type MenuProps = Omit<RmwcMenuProps, "children"> & {
    // A handler which triggers the menu, e.g. button or link.
    handle?: React.ReactElement;

    // Position the menu to one of anchor corners.
    // 'bottomEnd' | 'bottomLeft' | 'bottomRight' | 'bottomStart' | 'topEnd' | 'topLeft' | 'topRight' | 'topStart'
    anchor?:
        | "bottomEnd"
        | "bottomLeft"
        | "bottomRight"
        | "bottomStart"
        | "topEnd"
        | "topLeft"
        | "topRight"
        | "topStart";

    // Class that will be added to the Menu element.
    className?: string;

    // If true, prevents menu from opening when clicked.
    disabled?: boolean;

    onOpen?: () => void;
    onClose?: () => void;

    // For testing purposes.
    "data-testid"?: string;

    // If rendering to portal, you can specify an exact zIndex.
    portalZIndex?: number;
} & ( // You can use either `children` or `render`, but not both.
        | {
              // One or more MenuItem components.
              children: React.ReactNode | RenderableMenuChildren;
              render?: never;
          }
        | {
              render: RenderableMenuChildren;
              children?: never;
          }
    );

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `DropdownMenu` component from the `@webiny/admin-ui` package instead.
 */
const Menu = (props: MenuProps) => {
    const {
        children,
        handle,
        anchor = "topStart",
        className,
        disabled,
        onOpen,
        onClose,
        onSelect,
        open,
        render,
        renderToPortal,
        portalZIndex = 99
    } = props;

    return <AdminUiDropdownMenu trigger={handle}>{children}</AdminUiDropdownMenu>;

};

const MenuDivider = () => {
    return <AdminUiDropdownMenu.Separator />;
};

interface MenuItemProps extends BaseMenuItemProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    "data-testid"?: string;
}

const isIconElement = (element: React.ReactNode) => {
    return React.isValidElement(element) && element.type === ListItemGraphic;
};

const MenuItem = ({ disabled, children, className, ...rest }: MenuItemProps) => {
    const icon = useMemo(() => {
        const foundIcon = React.Children.toArray(children).find(isIconElement);
        // Handles this usage: packages/app-admin/src/components/OptionsMenu/OptionsMenuItem.tsx
        if (React.isValidElement(foundIcon) && foundIcon.type === ListItemGraphic) {
            return foundIcon.props.children;
        }
        return foundIcon;
    }, [children]);

    const content = React.Children.toArray(children).filter(child => {
        return !isIconElement(child);
    });

    return <AdminUiDropdownMenu.Item icon={icon} content={content} />;
};

export { Menu, MenuItem, MenuDivider };
