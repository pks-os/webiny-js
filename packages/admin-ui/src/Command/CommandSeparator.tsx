import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn, makeDecoratable } from "~/utils";
import { Separator } from "~/Separator";

const DecoratableCommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 h-px bg-border", className)}
        asChild
        {...props}
    >
        <Separator />
    </CommandPrimitive.Separator>
));
DecoratableCommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandSeparator = makeDecoratable("CommandSeparator", DecoratableCommandSeparator);

export { CommandSeparator };
