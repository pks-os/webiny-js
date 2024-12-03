import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn, makeDecoratable } from "~/utils";

const DecoratableCommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            "[&_[cmdk-group-heading]]:px-sm [&_[cmdk-group-heading]]:py-xs-plus [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-strong",
            className
        )}
        {...props}
    />
));
DecoratableCommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandGroup = makeDecoratable("CommandGroup", DecoratableCommandGroup);

export { CommandGroup };
