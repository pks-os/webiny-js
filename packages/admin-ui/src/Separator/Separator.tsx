import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, VariantProps, makeDecoratable } from "~/utils";

const separatorVariants = cva("shrink-0", {
    variants: {
        margin: {
            none: "",
            xs: "",
            sm: "",
            md: "",
            lg: "",
            xl: ""
        },
        orientation: {
            horizontal: "h-px w-full",
            vertical: "h-full w-px"
        },
        variant: {
            transparent: "transparent",
            white: "bg-white",
            subtle: "bg-neutral-dimmed",
            dimmed: "bg-neutral-muted",
            strong: "bg-neutral-strong"
        }
    },
    compoundVariants: [
        { orientation: "horizontal", margin: "xs", className: "my-px" },
        { orientation: "horizontal", margin: "sm", className: "my-[2px]" },
        { orientation: "horizontal", margin: "md", className: "my-[4px]" },
        { orientation: "horizontal", margin: "lg", className: "my-[8px]" },
        { orientation: "horizontal", margin: "xl", className: "my-[16px]" },
        { orientation: "vertical", margin: "xs", className: "mx-px" },
        { orientation: "vertical", margin: "sm", className: "mx-[2px]" },
        { orientation: "vertical", margin: "md", className: "mx-[4px]" },
        { orientation: "vertical", margin: "lg", className: "mx-[8px]" },
        { orientation: "vertical", margin: "xl", className: "mx-[16px]" }
    ],
    defaultVariants: {
        orientation: "horizontal",
        variant: "strong",
        margin: "md"
    }
});

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
    VariantProps<typeof separatorVariants>;

const SeparatorBase = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    SeparatorProps
>(({ className, orientation, margin, variant, decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={separatorVariants({ orientation, margin, variant, className })}
        {...props}
    />
));

SeparatorBase.displayName = SeparatorPrimitive.Root.displayName;

const Separator = makeDecoratable("Separator", SeparatorBase);

export { Separator };
