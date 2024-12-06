import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";

const CommandGroup = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) => (
    <CommandPrimitive.Group
        className={cn(
            "[&_[cmdk-group-heading]]:px-sm [&_[cmdk-group-heading]]:py-xs-plus [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-strong",
            className
        )}
        {...props}
    />
);

export { CommandGroup };
