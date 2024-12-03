import React, { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";
import { Command as CommandPrimitive } from "cmdk";
import { CommandGroup, CommandItem, CommandList, CommandInput, Command } from "~/Command";
import { cn } from "~/utils";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompletePrimitiveProps = {
    options: Option[];
    emptyMessage: string;
    value?: Option;
    onValueChange?: (value: Option) => void;
    isLoading?: boolean;
    disabled?: boolean;
    placeholder?: string;
};

const AutoCompletePrimitive = ({
    options,
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    disabled,
    isLoading = false
}: AutoCompletePrimitiveProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option>(value as Option);
    const [inputValue, setInputValue] = useState<string>(value?.label || "");

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (!input) {
                return;
            }

            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setOpen(true);
            }

            // This is not a default behaviour of the <input /> field
            if (event.key === "Enter" && input.value !== "") {
                const optionToSelect = options.find(option => option.label === input.value);
                if (optionToSelect) {
                    setSelected(optionToSelect);
                    onValueChange?.(optionToSelect);
                }
            }

            if (event.key === "Escape") {
                input.blur();
            }
        },
        [isOpen, options, onValueChange]
    );

    const handleBlur = useCallback(() => {
        setOpen(false);
        setInputValue(selected?.label);
    }, [selected]);

    const handleSelectOption = useCallback(
        (selectedOption: Option) => {
            setInputValue(selectedOption.label);

            setSelected(selectedOption);
            onValueChange?.(selectedOption);

            // This is a hack to prevent the input from being focused after the user selects an option
            // We can call this hack: "The next tick"
            setTimeout(() => {
                inputRef?.current?.blur();
            }, 0);
        },
        [onValueChange]
    );

    return (
        <Command
            ref={inputRef}
            options={options}
            value={inputValue}
            placeholder={placeholder}
            onValueChange={setInputValue}
            onBlur={handleBlur}
            disabled={disabled}
            onFocus={() => setOpen(true)}
        />
        // <CommandPrimitive onKeyDown={handleKeyDown}>
        //     <div>
        //         <CommandInput
        //             ref={inputRef}
        //             value={inputValue}
        //             onValueChange={isLoading ? undefined : setInputValue}
        //             onBlur={handleBlur}
        //             onFocus={() => setOpen(true)}
        //             placeholder={placeholder}
        //             disabled={disabled}
        //             className="text-base"
        //         />
        //     </div>
        //     <div className="relative mt-1">
        //         <div
        //             className={cn(
        //                 "animate-in fade-in-0 zoom-in-95 z-10",
        //                 isOpen ? "block" : "hidden"
        //             )}
        //         >
        //             <CommandList>
        //                 {isLoading ? (
        //                     <CommandPrimitive.Loading>{"LOADING"}</CommandPrimitive.Loading>
        //                 ) : null}
        //                 {options.length > 0 && !isLoading ? (
        //                     <CommandGroup>
        //                         {options.map(option => {
        //                             const isSelected = selected?.value === option.value;
        //                             return (
        //                                 <CommandItem
        //                                     key={option.value}
        //                                     value={option.label}
        //                                     onMouseDown={event => {
        //                                         event.preventDefault();
        //                                         event.stopPropagation();
        //                                     }}
        //                                     onSelect={() => handleSelectOption(option)}
        //                                 >
        //                                     {option.label}
        //                                     {isSelected ? <Check className="w-md h-md" /> : null}
        //                                 </CommandItem>
        //                             );
        //                         })}
        //                     </CommandGroup>
        //                 ) : null}
        //                 {!isLoading ? (
        //                     <CommandPrimitive.Empty>{emptyMessage}</CommandPrimitive.Empty>
        //                 ) : null}
        //             </CommandList>
        //         </div>
        //     </div>
        // </CommandPrimitive>
    );
};

export { AutoCompletePrimitive, type AutoCompletePrimitiveProps };
