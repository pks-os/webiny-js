import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";
import { CommandOptionFormatted } from "./CommandOptionFormatted";
import { CommandGroup } from "./CommandGroup";
import { CommandItem } from "./CommandItem";
import { CommandSeparator } from "./CommandSeparator";
import { CommandLoading } from "./CommandLoading";
import { CommandEmpty } from "./CommandEmpty";

interface CommandListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
    options: CommandOptionFormatted[];
    emptyMessage?: React.ReactNode;
    isLoading?: boolean;
    loadingMessage?: React.ReactNode;
    onOptionSelect: (value: string) => void;
}

const CommandList = ({
    className,
    onOptionSelect,
    emptyMessage,
    isLoading,
    loadingMessage,
    options,
    ...props
}: CommandListProps) => {
    const renderOptions = React.useCallback(
        (items: CommandOptionFormatted[]) => {
            return items.map((item, index) => {
                const elements = [];

                elements.push(
                    <CommandItem
                        key={`item-${item.value}`}
                        value={item.value}
                        keywords={[item.label]}
                        disabled={item.disabled}
                        selected={item.selected}
                        onSelect={() => onOptionSelect(item.value)}
                        onMouseDown={event => {
                            event.preventDefault();
                        }}
                    >
                        {item.label}
                    </CommandItem>
                );

                // Conditionally render the separator if `separator` is true
                if (item.separator) {
                    elements.push(<CommandSeparator key={`separator-${item.value ?? index}`} />);
                }

                return elements;
            });
        },
        [onOptionSelect]
    );

    return (
        <CommandPrimitive.List
            className={cn(
                [
                    "block max-h-96 min-w-56 w-full shadow-lg py-sm overflow-y-auto overflow-x-hidden rounded-sm border-sm border-neutral-muted bg-neutral-base text-neutral-strong"
                ],
                className
            )}
            {...props}
        >
            {isLoading ? <CommandLoading>{loadingMessage}</CommandLoading> : null}
            {options.length > 0 && !isLoading ? (
                <CommandGroup>{renderOptions(options)}</CommandGroup>
            ) : null}
            {!isLoading ? <CommandEmpty>{emptyMessage}</CommandEmpty> : null}
        </CommandPrimitive.List>
    );
};

export { CommandList, type CommandListProps };
