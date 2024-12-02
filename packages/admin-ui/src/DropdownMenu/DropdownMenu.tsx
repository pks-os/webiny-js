import * as React from "react";
import { Separator, type SeparatorProps } from "~/Separator";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ReactComponent as Check } from "@material-design-icons/svg/filled/check.svg";
import { ReactComponent as ChevronRight } from "@material-design-icons/svg/filled/chevron_right.svg";
import { ReactComponent as Circle } from "@material-design-icons/svg/filled/circle.svg";
import { cn, makeDecoratable, withStaticProps } from "~/utils";

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "flex flex-col z-50 min-w-[8rem] overflow-hidden rounded-md gap-xxs bg-white py-xs-plus text-neutral-primary shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-sm border-neutral-muted",
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

interface DropdownMenuProps
    extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
    trigger: React.ReactNode;
    children: React.ReactNode;
}

const DropdownMenuBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Root>,
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
        <DropdownMenuPrimitive.Root {...rootProps}>
            <DropdownMenuPrimitive.Trigger {...triggerProps} />
            <DropdownMenuContent {...contentProps} ref={ref} />
        </DropdownMenuPrimitive.Root>
    );
});

DropdownMenuBase.displayName = "DropdownMenu";

const DecoratableDropdownMenu = makeDecoratable("DropdownMenu", DropdownMenuBase);

// ================================================================================
// ================================================================================
// ================================================================================

const DropdownMenuShortcutBase = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span className={cn("ml-auto text-xs opacity-60", className)} {...props} />;
};
DropdownMenuShortcutBase.displayName = "DropdownMenuShortcut";

const DropdownMenuShortcut = makeDecoratable("DropdownMenuShortcut", DropdownMenuShortcutBase);

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {}
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-md outline-none focus:bg-neutral-dimmed data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            className
        )}
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-neutral-primary shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    icon?: React.ReactNode;
    shortcut?: string;
};

const DropdownMenuItemBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, icon, shortcut, children, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative cursor-default select-none items-center gap-2 rounded-sm px-xs-plus outline-none transition-colors  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        <div
            className={
                "flex p-sm gap-sm-extra items-center text-md hover:bg-neutral-dimmed rounded-sm"
            }
        >
            {icon}
            <span>{children}</span>
            {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
        </div>
    </DropdownMenuPrimitive.Item>
));
DropdownMenuItemBase.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuItem = makeDecoratable("DropdownMenuItem", DropdownMenuItemBase);

const DropdownMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-md outline-none transition-colors focus:bg-neutral-dimmed focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        checked={checked}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-md outline-none transition-colors focus:bg-neutral-dimmed focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabelBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {}
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn(
            "py-sm pl-sm-extra pr-md text-sm uppercase text-neutral-strong font-semibold",
            className
        )}
        {...props}
    />
));
DropdownMenuLabelBase.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuLabel = makeDecoratable("DropdownMenuLabel", DropdownMenuLabelBase);

const DropdownMenuSeparatorBase = React.forwardRef<
    React.ElementRef<typeof Separator>,
    SeparatorProps
>((props, ref) => {
    return <Separator ref={ref} variant={"strong"} margin={"md"} {...props} />;
});

DropdownMenuSeparatorBase.displayName = Separator.displayName;

const DropdownMenuSeparator = makeDecoratable("DropdownMenuSeparator", DropdownMenuSeparatorBase);

const DropdownMenu = withStaticProps(DecoratableDropdownMenu, {
    Group: DropdownMenuGroup,
    Portal: DropdownMenuPortal,
    Sub: DropdownMenuSub,
    SubContent: DropdownMenuSubContent,
    Item: DropdownMenuItem,
    CheckboxItem: DropdownMenuCheckboxItem,
    RadioItem: DropdownMenuRadioItem,
    Label: DropdownMenuLabel,
    Separator: DropdownMenuSeparator,
    SubTrigger: DropdownMenuSubTrigger,
    RadioGroup: DropdownMenuRadioGroup
});

export { DropdownMenu };
