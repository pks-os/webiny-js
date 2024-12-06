import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { InputPrimitive, InputPrimitiveProps } from "~/Input";

type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> &
    InputPrimitiveProps;

const CommandInput = (props: CommandInputProps) => {
    return (
        <CommandPrimitive.Input asChild {...props}>
            <InputPrimitive />
        </CommandPrimitive.Input>
    );
};

export { CommandInput, CommandInputProps };
