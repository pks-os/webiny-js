import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";
import { ReactComponent as ChevronRight } from "@material-design-icons/svg/filled/chevron_right.svg";

const DropdownMenuSubTriggerBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {}
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            "group flex cursor-default select-none items-center rounded-sm px-xs-plus text-md outline-none",
            className
        )}
        {...props}
    >
        <div
            className={cn(
                "rounded-sm gap-sm-extra group-focus:bg-neutral-dimmed flex items-center w-full px-sm py-xs-plus transition-colors",
                "[&_svg]:pointer-events-none [&_svg]:size-md [&_svg]:shrink-0 [&_svg]:fill-neutral-xstrong"
            )}
        >
            {children}
            <ChevronRight className="ml-auto" />
        </div>
    </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTriggerBase.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export const DropdownMenuSubTrigger = makeDecoratable(
    "DropdownMenuSubTrigger",
    DropdownMenuSubTriggerBase
);
