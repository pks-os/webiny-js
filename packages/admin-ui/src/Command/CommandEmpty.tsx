import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

const CommandEmpty = (props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) => (
    <CommandPrimitive.Empty
        className="bg-neutral-base text-neutral-strong fill-neutral-xstrong rounded-sm p-sm mx-sm text-md outline-none"
        {...props}
    />
);

export { CommandEmpty };
