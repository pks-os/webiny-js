import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { makeDecoratable } from "~/utils";
import { Input, InputPrimitiveProps } from "~/Input";

type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> &
    InputPrimitiveProps;

const DecoratableCommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    CommandInputProps
>((props, ref) => (
    <CommandPrimitive.Input ref={ref} asChild {...props}>
        <Input />
    </CommandPrimitive.Input>
));
DecoratableCommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandInput = makeDecoratable("CommandInput", DecoratableCommandInput);

export { CommandInput, CommandInputProps };
