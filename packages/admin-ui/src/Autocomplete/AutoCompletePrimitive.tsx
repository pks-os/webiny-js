import React, { useRef, type KeyboardEvent } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CommandList, CommandInput, Command, CommandOptionDto } from "~/Command";
import { cn, cva, type VariantProps } from "~/utils";
import { inputVariants } from "~/Input";
import { useAutoComplete } from "~/Autocomplete/useAutoComplete";
import { AutoCompleteInputIcons } from "./AutoCompleteInputIcons";

const commandListVariants = cva("animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full", {
    variants: {
        open: {
            true: "block",
            false: "hidden"
        }
    }
});

export type Option = CommandOptionDto | string;

type AutoCompletePrimitiveProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    disabled?: boolean;
    emptyMessage?: string;
    endIcon?: React.ReactElement;
    invalid?: VariantProps<typeof inputVariants>["invalid"];
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: Option[];
    placeholder?: string;
    size?: VariantProps<typeof inputVariants>["size"];
    startIcon?: React.ReactElement;
    variant?: VariantProps<typeof inputVariants>["variant"];
};

const AutoCompletePrimitive = (props: AutoCompletePrimitiveProps) => {
    const { vm, toggleListOpenState, setSelectedOption, setInputValue, resetValue } =
        useAutoComplete(props);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        if (event.key === "Escape") {
            input.blur();
        }
    };

    const handleSelectOption = (value: string) => {
        setSelectedOption(value);
        // This is a hack to prevent the input from being focused after the user selects an option
        inputRef?.current?.blur();
    };

    return (
        <Command onKeyDown={handleKeyDown}>
            <CommandInput
                inputRef={inputRef}
                value={vm.inputVm.value}
                onValueChange={setInputValue}
                placeholder={vm.inputVm.placeholder}
                disabled={props.disabled}
                onBlur={() => toggleListOpenState(false)}
                onFocus={() => toggleListOpenState(true)}
                endIcon={
                    <AutoCompleteInputIcons
                        hasValue={vm.inputVm.hasValue}
                        resetValue={resetValue}
                        toggleListOpenState={() => toggleListOpenState(!vm.listVm.isOpen)}
                    />
                }
            />
            <div className="relative mt-xs-plus">
                <div className={cn(commandListVariants({ open: vm.listVm.isOpen }))}>
                    <CommandList
                        options={vm.listVm.options}
                        onOptionSelect={handleSelectOption}
                        isLoading={vm.listVm.isLoading}
                        emptyMessage={vm.listVm.emptyMessage}
                    />
                </div>
            </div>
        </Command>
    );
};

export { AutoCompletePrimitive, type AutoCompletePrimitiveProps };
