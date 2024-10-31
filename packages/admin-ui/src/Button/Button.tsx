import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils";
import { makeDecoratable } from "@webiny/react-composition";

const buttonVariants = cva(
    "font-sans inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-neutral-light hover:bg-primary-strong active:bg-primary-xstrong disabled:bg-primary-disabled [&>svg]:fill-white",
                secondary:
                    "bg-neutral-dimmed text-neutral-strong hover:bg-neutral-muted active:bg-neutral-strong disabled:bg-neutral-disabled disabled:text-neutral-disabled [&>svg]:fill-white",
                tertiary:
                    "bg-neutral-base text-neutral-strong border border-neutral-muted hover:bg-neutral-light active:bg-neutral-muted disabled:bg-neutral-disabled disabled:border-none box-border disabled:text-neutral-disabled [&>svg]:fill-white",
                ghost: " text-neutral-strong hover:bg-neutral-dimmed active:bg-neutral-muted disabled:text-neutral-disabled [&>svg]:fill-white",
            },
            size: {
                sm: "py-xs-plus px-sm-extra rounded-sm text-md font-normal",
                md: "py-xs-plus px-sm-extra rounded-sm  text-md font-normal",
                lg: "py-sm-plus px-md rounded-sm text-base font-medium",
                xl: "py-md px-md-plus rounded-md text-lg font-medium"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    }
);

interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
        VariantProps<typeof buttonVariants> {
    text?: React.ReactNode;

    icon?: React.ReactNode;

    iconPosition?: "start" | "end";

    asChild?: boolean;
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, variant, size, asChild = false, text, icon, iconPosition, ...rest } = props;
    const Comp = asChild ? Slot : "button";

    return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...rest}>
            {iconPosition !== "end" && icon}
            {text}
            {iconPosition === "end" && icon}
        </Comp>
    );
});

ButtonBase.displayName = "Button";

const Button = makeDecoratable("Button", ButtonBase);

export { Button, type ButtonProps };
