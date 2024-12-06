import React, { KeyboardEvent } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CommandList, CommandInput, Command, CommandOptionDto } from "~/Command";
import { cn, cva } from "~/utils";
import { InputPrimitiveProps } from "~/Input";
import { useAutoComplete } from "./useAutoComplete";
import { AutoCompleteInputIcons } from "./AutoCompleteInputIcons";

const commandListVariants = cva(
    "animate-in fade-in-0 zoom-in-95 absolute top-xs-plus z-10 w-full outline-none",
    {
        variants: {
            open: {
                true: "block",
                false: "hidden"
            }
        }
    }
);

type AutoCompleteOption = CommandOptionDto | string;

type AutoCompletePrimitiveProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> &
    InputPrimitiveProps & {
        emptyMessage?: string;
        onOpenChange?: (open: boolean) => void;
        onValueChange: (value: string) => void;
        onValueReset?: () => void;
        options?: AutoCompleteOption[];
        optionRenderer?: (item: any, index: number) => React.ReactNode;
    };

const AutoCompletePrimitive = (props: AutoCompletePrimitiveProps) => {
    const { vm, setListOpenState, setSelectedOption, setInputValue, resetValue } =
        useAutoComplete(props);

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key.toLowerCase() === "escape") {
                setListOpenState(false);
            }

            if (event.key.toLowerCase() === "backspace") {
                setListOpenState(true);
                setSelectedOption("");
                setInputValue("");
            }
        },
        [setListOpenState, setSelectedOption, setInputValue, vm.listVm.isOpen]
    );

    const handleSelectOption = React.useCallback(
        (value: string) => {
            setSelectedOption(value);
            setListOpenState(false);
        },
        [setSelectedOption, setListOpenState]
    );

    return (
        <Command onKeyDown={handleKeyDown}>
            <CommandInput
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
            <div className="relative">
                <div className={cn(commandListVariants({ open: vm.listVm.isOpen }))}>
                    <CommandList
                        options={vm.listVm.options}
                        onOptionSelect={handleSelectOption}
                        isLoading={vm.listVm.isLoading}
                        emptyMessage={vm.listVm.emptyMessage}
                        optionRenderer={props.optionRenderer}
                    />
                </div>
            </div>
        </Command>
    );
};

export { AutoCompletePrimitive, type AutoCompletePrimitiveProps, type AutoCompleteOption };
