import React, { useRef, type KeyboardEvent } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CommandList, CommandInput, Command, CommandOptionDto } from "~/Command";
import { cn, cva, type VariantProps } from "~/utils";
import { inputVariants } from "~/Input";
import { useAutoComplete } from "~/Autocomplete/useAutoComplete";
import { AutoCompleteInputIcons } from "./AutoCompleteInputIcons";
import { Icon as BaseIcon } from "~/Icon";

const commandListVariants = cva(
    "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full outline-none",
    {
        variants: {
            open: {
                true: "block",
                false: "hidden"
            }
        }
    }
);

export type Option = CommandOptionDto | string;

type AutoCompletePrimitiveProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    disabled?: boolean;
    emptyMessage?: string;
    invalid?: VariantProps<typeof inputVariants>["invalid"];
    onOpenChange?: (open: boolean) => void;
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: Option[];
    placeholder?: string;
    size?: VariantProps<typeof inputVariants>["size"];
    startIcon?: React.ReactElement<typeof BaseIcon> | React.ReactElement;
    variant?: VariantProps<typeof inputVariants>["variant"];
};

const AutoCompletePrimitive = (props: AutoCompletePrimitiveProps) => {
    const { vm, setListOpenState, setSelectedOption, setInputValue, resetValue } =
        useAutoComplete(props);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (!vm.listVm.isOpen) {
                setListOpenState(true);
            }

            if (event.key === "Escape") {
                setListOpenState(false);
                inputRef?.current?.blur();
            }
        },
        [setListOpenState, vm.listVm.isOpen]
    );

    const handleSelectOption = React.useCallback(
        (value: string) => {
            setSelectedOption(value);
            inputRef?.current?.blur();
        },
        [setSelectedOption]
    );

    return (
        <Command onKeyDown={handleKeyDown}>
            <CommandInput
                inputRef={inputRef}
                value={vm.inputVm.value}
                onValueChange={setInputValue}
                placeholder={vm.inputVm.placeholder}
                size={props.size}
                variant={props.variant}
                disabled={props.disabled}
                invalid={props.invalid}
                startIcon={props.startIcon}
                endIcon={
                    <AutoCompleteInputIcons
                        hasValue={vm.inputVm.hasValue}
                        onResetValue={resetValue}
                        onOpenChange={() => setListOpenState(!vm.listVm.isOpen)}
                    />
                }
                onBlur={() => setListOpenState(false)}
                onFocus={() => setListOpenState(true)}
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
