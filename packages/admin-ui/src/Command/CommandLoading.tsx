import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

const CommandLoading = (props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>) => (
    <CommandPrimitive.Loading
        className="bg-neutral-base text-neutral-strong fill-neutral-xstrong rounded-sm p-sm mx-sm text-md outline-none"
        {...props}
    />
);

export { CommandLoading };
