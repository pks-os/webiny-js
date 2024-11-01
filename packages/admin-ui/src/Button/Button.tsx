import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";

const buttonVariants = cva(
    "box-border font-sans inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors disabled:pointer-events-none rounded focus-visible:outline-none",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-neutral-light hover:bg-primary-strong active:bg-primary-xstrong disabled:bg-primary-disabled [&>svg]:fill-neutral-base focus-visible:ring-lg focus-visible:ring-primary-dimmed",
                secondary:
                    "bg-neutral-dimmed text-neutral-strong hover:bg-neutral-muted active:bg-neutral-strong disabled:bg-neutral-disabled disabled:text-neutral-disabled [&>svg]:fill-white focus-visible:ring-lg focus-visible:ring-primary-dimmed",
                tertiary:
                    "bg-neutral-base text-neutral-strong border-sm border-neutral-muted hover:bg-neutral-light active:bg-neutral-muted disabled:bg-neutral-disabled disabled:border-none disabled:text-neutral-disabled [&>svg]:fill-white focus-visible:ring-lg focus-visible:ring-primary-dimmed focus-visible:border-accent-default",
                ghost: "text-neutral-strong hover:bg-neutral-dimmed active:bg-neutral-muted disabled:text-neutral-disabled [&>svg]:fill-white focus-visible:border-accent-default focus-visible:border-sm"
            },
            size: {
                sm: "py-xs-plus px-sm-extra rounded-sm text-sm",
                md: "py-xs-plus px-sm-extra rounded-sm  text-md",
                lg: "py-sm-plus px-md rounded-sm text-md",
                xl: "py-md px-md-plus rounded-md text-lg"
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
