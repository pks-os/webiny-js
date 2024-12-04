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
            "flex cursor-default gap-2 select-none items-center rounded-sm px-xs-plus text-md outline-none focus:bg-neutral-dimmed data-[state=open]:bg-neutral-dimmed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            className
        )}
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTriggerBase.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export const DropdownMenuSubTrigger = makeDecoratable(
    "DropdownMenuSubTrigger",
    DropdownMenuSubTriggerBase
);
