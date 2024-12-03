import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn, makeDecoratable } from "~/utils";
import { CommandOptionFormatted } from "./CommandOptionFormatted";
import { CommandGroup } from "./CommandGroup";
import { CommandItem } from "./CommandItem";
import { CommandSeparator } from "./CommandSeparator";

interface CommandListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
    options: CommandOptionFormatted[];
}

const DecoratableCommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    CommandListProps
>(({ className, ...props }, ref) => {
    const renderOptions = React.useCallback((items: CommandOptionFormatted[]) => {
        return items.map((item, index) => {
            const elements = [];

            if (item.options.length > 0) {
                // Render as a group if there are nested options
                elements.push(
                    <CommandGroup key={`group-${index}`} heading={item.label}>
                        {renderOptions(item.options)}
                    </CommandGroup>
                );
            }

            if (item.value) {
                // Render as a select item if there are no nested options
                elements.push(
                    <CommandItem
                        key={`item-${item.value}`}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </CommandItem>
                );
            }

            // Conditionally render the separator if hasSeparator is true
            if (item.separator) {
                elements.push(<CommandSeparator key={`separator-${item.value ?? index}`} />);
            }

            return elements;
        });
    }, []);

    return (
        <CommandPrimitive.List
            ref={ref}
            className={cn(
                [
                    "max-h-96 min-w-56 shadow-lg py-sm overflow-y-auto overflow-x-hidden rounded-sm border-sm border-neutral-muted bg-neutral-base text-neutral-strong"
                ],
                className
            )}
            {...props}
        >
            {renderOptions(props.options)}
        </CommandPrimitive.List>
    );
});
DecoratableCommandList.displayName = CommandPrimitive.List.displayName;

const CommandList = makeDecoratable("CommandList", DecoratableCommandList);

export { CommandList, type CommandListProps };
