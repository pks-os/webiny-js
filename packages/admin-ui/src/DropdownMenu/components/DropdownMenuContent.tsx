import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";

const DropdownMenuContentBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "flex flex-col z-50 min-w-[8rem] overflow-hidden rounded-md gap-xxs bg-white py-xs-plus text-neutral-primary shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-sm border-solid border-neutral-muted",
            className
        )}
        {...props}
    />
));
DropdownMenuContentBase.displayName = DropdownMenuPrimitive.Content.displayName;

export const DropdownMenuContent = makeDecoratable("DropdownMenuContent", DropdownMenuContentBase);
