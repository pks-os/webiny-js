import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";
import { DropdownMenuSubRoot } from "~/DropdownMenu/components/DropdownMenuSubRoot";
import { DropdownMenuSubTrigger } from "~/DropdownMenu/components/DropdownMenuSubTrigger";
import { DropdownMenuPortal } from "~/DropdownMenu/components/DropdownMenuPortal";
import { DropdownMenuSubContent } from "~/DropdownMenu/components/DropdownMenuSubContent";

export interface DropdownMenuItemProps
    extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>, "content"> {
    icon?: React.ReactNode;
    content?: React.ReactNode;
}

const DropdownMenuItemBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, icon, content, children, ...props }, ref) => {
    if (children) {
        return (
            <DropdownMenuSubRoot>
                <DropdownMenuSubTrigger>
                    {icon}
                    <span>{content}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>{children}</DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSubRoot>
        );
    }

    return (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "group relative cursor-default select-none items-center rounded-sm px-xs-plus outline-none transition-colors",
                "[&_svg]:fill-neutral-xstrong [&_svg]:pointer-events-none [&_svg]:size-md [&_svg]:shrink-0",
                "data-[disabled]:pointer-events-none data-[disabled]:text-neutral-disabled",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "flex px-sm py-xs-plus gap-sm-extra items-center text-md rounded-sm group-focus:bg-neutral-dimmed transition-colors",
                    { "[&_svg]:fill-neutral-disabled": props.disabled }
                )}
            >
                {icon}
                <span>{content}</span>
            </div>
        </DropdownMenuPrimitive.Item>
    );
});

DropdownMenuItemBase.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuItem = makeDecoratable("DropdownMenuItem", DropdownMenuItemBase);
