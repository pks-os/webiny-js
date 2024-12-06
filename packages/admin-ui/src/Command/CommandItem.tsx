import * as React from "react";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";
import { Command as CommandPrimitive } from "cmdk";
import { cn, cva, type VariantProps } from "~/utils";

const commandItemVariants = cva(
    [
        "flex items-center justify-between gap-sm-extra cursor-default select-none rounded-sm p-sm mx-sm text-md outline-none",
        "bg-neutral-base text-neutral-primary fill-neutral-xstrong",
        "data-[disabled=true]:text-neutral-disabled data-[disabled=true]:cursor-not-allowed",
        "data-[selected=true]:bg-neutral-dimmed"
    ],
    {
        variants: {
            selected: {
                true: "font-semibold bg-neutral-dimmed"
            }
        }
    }
);

interface CommandItemProps
    extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
        VariantProps<typeof commandItemVariants> {
    selected?: boolean;
}

const CommandItem = ({ className, children, selected, ...props }: CommandItemProps) => (
    <CommandPrimitive.Item className={cn(commandItemVariants({ selected }), className)} {...props}>
        {children}
        {selected ? <Check className="w-md h-md" /> : null}
    </CommandPrimitive.Item>
);

export { CommandItem };
