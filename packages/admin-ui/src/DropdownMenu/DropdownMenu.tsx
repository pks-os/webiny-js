import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DropdownMenuRoot } from "./components/DropdownMenuRoot";
import { DropdownMenuTrigger } from "./components/DropdownMenuTrigger";
import { DropdownMenuContent } from "./components/DropdownMenuContent";
import { DropdownMenuSeparator } from "./components/DropdownMenuSeparator";
import { DropdownMenuItem } from "./components/DropdownMenuItem";
import { DropdownMenuLabel } from "./components/DropdownMenuLabel";
import { DropdownMenuGroup } from "./components/DropdownMenuGroup";
import { DropdownMenuSubRoot } from "./components/DropdownMenuSubRoot";
import { DropdownMenuSubContent } from "./components/DropdownMenuSubContent";
import { DropdownMenuSubTrigger } from "./components/DropdownMenuSubTrigger";
import { DropdownMenuPortal } from "./components/DropdownMenuPortal";

interface DropdownMenuProps
    extends React.ComponentPropsWithoutRef<typeof DropdownMenuRoot>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuContent> {
    trigger: React.ReactNode;
    children: React.ReactNode;
}

const DropdownMenuBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuRoot>,
    DropdownMenuProps
>((props, ref) => {
    const { rootProps, triggerProps, contentProps } = React.useMemo(() => {
        const {
            // Root props.
            defaultOpen,
            open,
            onOpenChange,
            modal,
            dir,

            // Trigger props.
            trigger,

            // Content props.
            ...rest
        } = props;

        return {
            rootProps: {
                defaultOpen,
                open,
                onOpenChange,
                modal,
                dir
            },
            triggerProps: {
                children: trigger
            },
            contentProps: rest
        };
    }, [props]);

    return (
        <DropdownMenuRoot {...rootProps}>
            <DropdownMenuTrigger {...triggerProps} />
            <DropdownMenuPortal>
                <DropdownMenuContent {...contentProps} ref={ref} />
            </DropdownMenuPortal>
        </DropdownMenuRoot>
    );
});

DropdownMenuBase.displayName = "DropdownMenu";

const DecoratableDropdownMenu = makeDecoratable("DropdownMenu", DropdownMenuBase);

// ================================================================================

interface DropdownMenuSubProps
    extends React.ComponentPropsWithoutRef<typeof DropdownMenuSubRoot>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuSubContent> {
    trigger: React.ReactNode;
    children: React.ReactNode;
}

const DropdownMenuSubBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuSubRoot>,
    DropdownMenuSubProps
>((props, ref) => {
    const { rootProps, triggerProps, contentProps } = React.useMemo(() => {
        const {
            // Root props.
            defaultOpen,
            open,
            onOpenChange,

            // Trigger props.
            trigger,

            // Content props.
            ...rest
        } = props;

        return {
            rootProps: {
                defaultOpen,
                open,
                onOpenChange
            },
            triggerProps: {
                children: trigger
            },
            contentProps: rest
        };
    }, [props]);

    return (
        <DropdownMenuSubRoot {...rootProps}>
            <DropdownMenuSubTrigger {...triggerProps} />
            <DropdownMenuPortal>
                <DropdownMenuSubContent {...contentProps} ref={ref} />
            </DropdownMenuPortal>
        </DropdownMenuSubRoot>
    );
});

DropdownMenuSubBase.displayName = "DropdownMenuSub";

export const DropdownMenuSub = makeDecoratable("DropdownMenuSub", DropdownMenuSubBase);

const DropdownMenu = withStaticProps(DecoratableDropdownMenu, {
    Separator: DropdownMenuSeparator,
    Label: DropdownMenuLabel,
    Group: DropdownMenuGroup,
    Item: DropdownMenuItem,
    Sub: DropdownMenuSub
});

export { DropdownMenu };
