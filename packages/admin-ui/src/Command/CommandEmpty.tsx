import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { makeDecoratable } from "~/utils";

const DecoratableCommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));
DecoratableCommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandEmpty = makeDecoratable("CommandEmpty", DecoratableCommandEmpty);

export { CommandEmpty };
