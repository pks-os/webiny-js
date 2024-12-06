import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Separator } from "~/Separator";

const CommandSeparator = (
    props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
) => (
    <CommandPrimitive.Separator asChild {...props}>
        <Separator />
    </CommandPrimitive.Separator>
);

export { CommandSeparator };
