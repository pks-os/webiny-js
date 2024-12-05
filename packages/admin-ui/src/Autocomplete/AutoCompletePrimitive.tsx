import React, { useRef, useCallback, type KeyboardEvent } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CommandList, CommandInput, Command, CommandOptionDto } from "~/Command";
import { cn, type VariantProps } from "~/utils";
import { inputVariants } from "~/Input";
import { useAutoComplete } from "~/Autocomplete/useAutoComplete";

export type Option = CommandOptionDto | string;

type AutoCompletePrimitiveProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    endIcon?: React.ReactElement;
    invalid?: VariantProps<typeof inputVariants>["invalid"];
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: Option[];
    placeholder?: string;
    size?: VariantProps<typeof inputVariants>["size"];
    startIcon?: React.ReactElement;
    variant?: VariantProps<typeof inputVariants>["variant"];
    disabled?: boolean;
    emptyMessage?: string;
};

const AutoCompletePrimitive = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    AutoCompletePrimitiveProps
>((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { vm, toggleListOpenState, setSelectedOption, setInputValue } = useAutoComplete(props);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        // TODO: bring to Presenter
        // This is not a default behaviour of the <input /> field
        if (event.key === "Enter" && input.value !== "") {
            console.log("input.value", input.value);
            setSelectedOption(input.value);
        }

        if (event.key === "Escape") {
            input.blur();
        }
    };
    const handleBlur = useCallback(() => {
        toggleListOpenState(false);
    }, []);

    const handleSelectOption = (value: string) => {
        setSelectedOption(value);

        // This is a hack to prevent the input from being focused after the user selects an option
        // We can call this hack: "The next tick"
        setTimeout(() => {
            inputRef?.current?.blur();
        }, 0);
    };

    return (
        <Command onKeyDown={handleKeyDown} ref={ref}>
            <CommandInput
                ref={inputRef}
                value={vm.inputVm.value}
                onValueChange={setInputValue}
                onBlur={handleBlur}
                onFocus={() => toggleListOpenState(true)}
                placeholder={vm.inputVm.placeholder}
                disabled={props.disabled}
            />
            <CommandList
                options={vm.listVm.options}
                onOptionSelect={handleSelectOption}
                isLoading={vm.listVm.isLoading}
                emptyMessage={vm.listVm.emptyMessage}
                className={cn(vm.listVm.isOpen ? "block" : "hidden")}
            />
        </Command>
    );
});

AutoCompletePrimitive.displayName = "AutoCompletePrimitive";

export { AutoCompletePrimitive, type AutoCompletePrimitiveProps };
