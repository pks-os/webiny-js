// @ts-nocheck
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ReactComponent as Check } from "@material-design-icons/svg/filled/check.svg";
import { ReactComponent as Circle } from "@material-design-icons/svg/filled/circle.svg";
import { cn, withStaticProps } from "~/utils";
// import { DropdownMenuSeparator } from "./components/DropdownMenuSeparator";
// import { DropdownMenuItem } from "./components/DropdownMenuItem";
// import { DropdownMenuGroup } from "./components/DropdownMenuGroup";

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

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

const DropdownMenu = withStaticProps(DecoratableDropdownMenu, {
    Separator: DropdownMenuSeparator,
    Label: DropdownMenuLabel,
    Group: DropdownMenuGroup,
    Item: DropdownMenuItem,
    Sub: DropdownMenuSub,
    // ----
    CheckboxItem: DropdownMenuCheckboxItem,
    RadioItem: DropdownMenuRadioItem,
    RadioGroup: DropdownMenuRadioGroup
});

export { DropdownMenu };
