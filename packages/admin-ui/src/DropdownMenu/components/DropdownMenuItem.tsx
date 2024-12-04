import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";
import { DropdownMenuSub } from "~/DropdownMenu";

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    icon?: React.ReactNode;
    content?: React.ReactNode;
};

const DropdownMenuItemBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, icon, content, children, ...props }, ref) => {
    if (children) {
        return (
            <DropdownMenuSub
                trigger={
                    <div
                        className={
                            "kobajica flex p-sm gap-sm-extra items-center text-md hover:bg-neutral-dimmed rounded-sm"
                        }
                    >
                        {icon}
                        <span>{content}</span>
                    </div>
                }
            >
                {children}
            </DropdownMenuSub>
        );
    }

    return (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "relative cursor-default select-none items-center gap-2 rounded-sm px-xs-plus outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-neutral-xstrong",
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
                <span>{content}</span>
            </div>
        </DropdownMenuPrimitive.Item>
    );
});

DropdownMenuItemBase.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuItem = makeDecoratable("DropdownMenuItem", DropdownMenuItemBase);
