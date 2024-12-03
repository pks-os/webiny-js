import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn, makeDecoratable, type VariantProps } from "~/utils";
import { inputVariants } from "~/Input";
import { CommandOptionDto } from "./CommandOptionDto";
import { useCommand } from "./useCommand";
import { CommandOptionFormatted } from "./CommandOptionFormatted";
import { CommandInput } from "./CommandInput";
import { CommandList } from "./CommandList";
import { CommandEmpty } from "./CommandEmpty";

type CommandOption = CommandOptionDto | string;

type CommandPresenterProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    endIcon?: React.ReactElement;
    invalid?: VariantProps<typeof inputVariants>["invalid"];
    placeholder: string;
    size?: VariantProps<typeof inputVariants>["size"];
    startIcon?: React.ReactElement;
    variant?: VariantProps<typeof inputVariants>["variant"];
    options: CommandOptionFormatted[];
    onValueChange: (value: string) => void;
    onValueReset: () => void;
};

/**
 * Command Presenter
 */
const DecoratableCommandPresenter = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    CommandPresenterProps
>(
    (
        { className, placeholder, startIcon, endIcon, invalid, size, variant, options, ...props },
        ref
    ) => {
        return (
            <CommandPrimitive
                ref={ref}
                className={cn("flex h-full w-full flex-col overflow-hidden", className)}
                {...props}
            >
                <CommandInput
                    placeholder={placeholder}
                    startIcon={startIcon}
                    endIcon={endIcon}
                    invalid={invalid}
                    // size={size}
                    variant={variant}
                />
                <CommandEmpty>{"No results found."}</CommandEmpty>
                <CommandList options={options}></CommandList>
            </CommandPrimitive>
        );
    }
);
DecoratableCommandPresenter.displayName = "DecoratableCommandPresenter";

const CommandPresenter = makeDecoratable("CommandPresenter", DecoratableCommandPresenter);

/**
 * Command
 */
type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    endIcon?: React.ReactElement;
    invalid?: VariantProps<typeof inputVariants>["invalid"];
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: CommandOption[];
    placeholder?: string;
    size?: VariantProps<typeof inputVariants>["size"];
    startIcon?: React.ReactElement;
    variant?: VariantProps<typeof inputVariants>["variant"];
};

const DecoratableCommand = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    CommandProps
>((props, ref) => {
    const { vm, changeValue, resetValue } = useCommand(props);
    return (
        <CommandPresenter
            {...props}
            {...vm}
            ref={ref}
            onValueChange={changeValue}
            onValueReset={resetValue}
        />
    );
});
DecoratableCommand.displayName = CommandPrimitive.displayName;

const Command = makeDecoratable("Command", DecoratableCommand);

export { Command, type CommandProps, type CommandOption };
