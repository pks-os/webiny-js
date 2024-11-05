import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";

const buttonVariants = cva(
    "border-transparent rounded font-sans inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary: [
                    "bg-primary text-neutral-light [&>svg]:fill-neutral-base",
                    "hover:bg-primary-strong",
                    "active:bg-primary-xstrong",
                    "disabled:bg-primary-disabled",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                secondary: [
                    "bg-neutral-dimmed text-neutral-strong [&>svg]:fill-white",
                    "hover:bg-neutral-muted",
                    "active:bg-neutral-strong",
                    "disabled:bg-neutral-disabled disabled:text-neutral-disabled",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                tertiary: [
                    "bg-neutral-base text-neutral-strong border-neutral-muted [&>svg]:fill-white",
                    "hover:bg-neutral-light",
                    "active:bg-neutral-muted",
                    "disabled:bg-neutral-disabled disabled:border-none disabled:text-neutral-disabled",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed focus-visible:border-accent-default"
                ],
                ghost: [
                    "text-neutral-strong [&>svg]:fill-white",
                    "hover:bg-neutral-dimmed",
                    "active:bg-neutral-muted",
                    "disabled:text-neutral-disabled",
                    "focus-visible:border-accent-default focus-visible:border-sm"
                ]
            },
            size: {
                sm: [
                    "text-sm border-sm rounded-sm",
                    `py-[calc(theme(padding.xs)-theme(borderWidth.sm))] px-[calc(theme(padding.sm)-theme(borderWidth.sm))]`
                ],
                md: [
                    "text-md border-sm rounded-sm",
                    `py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]`
                ],
                lg: [
                    "text-md border-sm rounded-sm",
                    `py-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.md)-theme(borderWidth.sm))]`
                ],
                xl: [
                    "text-lg border-md rounded-md",
                    `py-[calc(theme(padding.md-plus)-theme(borderWidth.md))] px-[calc(theme(padding.md)-theme(borderWidth.md))]`
                ]
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

    console.log(cn(buttonVariants({ variant, size, className })));
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
