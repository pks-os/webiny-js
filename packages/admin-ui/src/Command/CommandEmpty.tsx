import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

const CommandEmpty = (props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) => (
    <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
);

export { CommandEmpty };
