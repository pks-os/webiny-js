import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { makeDecoratable } from "~/utils";

const DecoratableCommandLoading = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Loading>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>((props, ref) => (
    <CommandPrimitive.Loading ref={ref} className="py-6 text-center text-sm" {...props} />
));
DecoratableCommandLoading.displayName = CommandPrimitive.Loading.displayName;

const CommandLoading = makeDecoratable("CommandLoading", DecoratableCommandLoading);

export { CommandLoading };
