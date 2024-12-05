import * as React from "react";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";
import { Command as CommandPrimitive } from "cmdk";
import { cn, makeDecoratable } from "~/utils";

interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
    selected?: boolean;
}

const DecoratableCommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    CommandItemProps
>(({ className, children, selected, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn(
            [
                "flex items-center justify-between gap-sm-extra cursor-default select-none rounded-sm p-sm mx-sm text-md outline-none",
                "bg-neutral-base text-neutral-primary fill-neutral-xstrong",
                "hover:bg-neutral-dimmed",
                "data-[disabled=true]:text-neutral-disabled data-[disabled=true]:cursor-not-allowed",
                "data-[selected=true]:bg-neutral-dimmed"
            ],
            className
        )}
        {...props}
    >
        {children}
        {selected ? <Check className="w-md h-md" /> : null}
    </CommandPrimitive.Item>
));
DecoratableCommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandItem = makeDecoratable("CommandItem", DecoratableCommandItem);

export { CommandItem };
