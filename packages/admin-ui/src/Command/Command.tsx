import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn, makeDecoratable } from "~/utils";

const DecoratableCommand = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn("flex h-full w-full flex-col overflow-hidden", className)}
        {...props}
    />
));
DecoratableCommand.displayName = CommandPrimitive.displayName;

const Command = makeDecoratable("Command", DecoratableCommand);

export { Command };
