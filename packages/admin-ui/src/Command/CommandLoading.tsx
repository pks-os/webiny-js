import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

const CommandLoading = (props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>) => (
    <CommandPrimitive.Loading className="py-6 text-center text-sm" {...props} />
);

export { CommandLoading };
