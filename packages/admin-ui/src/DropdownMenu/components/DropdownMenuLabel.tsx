import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";

export interface DropdownMenuLabelProps extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>, "content"> {
    content: React.ReactNode;
}

const DropdownMenuLabelBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    DropdownMenuLabelProps
>(({ className, content, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn(
            "py-sm pl-sm-extra pr-md text-sm uppercase text-neutral-strong font-semibold",
            className
        )}
        {...props}
    >{content}</DropdownMenuPrimitive.Label>
));
DropdownMenuLabelBase.displayName = DropdownMenuPrimitive.Label.displayName;

export const DropdownMenuLabel = makeDecoratable("DropdownMenuLabel", DropdownMenuLabelBase);
