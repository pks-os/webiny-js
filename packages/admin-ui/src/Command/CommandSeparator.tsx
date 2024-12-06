import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";
import { Separator } from "~/Separator";

const CommandSeparator = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) => (
    <CommandPrimitive.Separator
        className={cn("-mx-1 h-px bg-border", className)}
        asChild
        {...props}
    >
        <Separator />
    </CommandPrimitive.Separator>
);

export { CommandSeparator };
