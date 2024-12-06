import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";

const Command = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) => (
    <CommandPrimitive
        className={cn("flex h-full w-full flex-col outline-none", className)}
        {...props}
    />
);

export { Command };
