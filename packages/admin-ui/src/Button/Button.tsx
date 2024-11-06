import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";

const buttonVariants = cva(
    [
        "border-transparent rounded font-sans inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors",
        "disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:border-accent-default"
    ],
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
                    "bg-neutral-dimmed text-neutral-strong [&>svg]:fill-neutral-xstrong",
                    "hover:bg-neutral-muted",
                    "active:bg-neutral-strong",
                    "disabled:bg-neutral-disabled disabled:text-neutral-disabled",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                tertiary: [
                    "bg-neutral-base text-neutral-strong border-neutral-muted [&>svg]:fill-neutral-xstrong",
                    "hover:bg-neutral-light",
                    "active:bg-neutral-muted",
                    "disabled:bg-neutral-disabled disabled:border-none disabled:text-neutral-disabled",
                    "focus-visible:ring-lg focus-visible:ring-primary-dimmed"
                ],
                ghost: [
                    "text-neutral-strong [&>svg]:fill-neutral-xstrong",
                    "hover:bg-neutral-dimmed",
                    "active:bg-neutral-muted",
                    "disabled:text-neutral-disabled"
                ]
            },
            size: {
                sm: [
                    "text-sm border-sm rounded-sm [&>svg]:size-md",
                    "py-[calc(theme(padding.xs)-theme(borderWidth.sm))] px-[calc(theme(padding.sm)-theme(borderWidth.sm))]"
                ],
                md: [
                    "text-md border-sm rounded-sm [&>svg]:size-md",
                    "py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                lg: [
                    "text-md border-sm rounded-sm [&>svg]:size-md",
                    "py-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.md)-theme(borderWidth.sm))]"
                ],
                xl: [
                    "text-lg font-semibold border-md rounded-md [&>svg]:size-lg",
                    "py-[calc(theme(padding.md-plus)-theme(borderWidth.md))] px-[calc(theme(padding.md)-theme(borderWidth.md))]"
                ]
            },
            iconPosition: {
                start: "",
                end: ""
            }
        },
        compoundVariants: [
            {
                size: "xl",
                variant: "ghost",
                className: "focus-visible:border-md"
            },
            // Margins between text and icon (all sizes / both positions).
            {
                size: "sm",
                iconPosition: "start",
                className: "pl-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&>svg]:mr-xs"
            },
            {
                size: "sm",
                iconPosition: "end",
                className: "pr-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&>svg]:ml-xs"
            },
            {
                size: "md",
                iconPosition: "start",
                className: "pl-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] [&>svg]:mr-xs"
            },
            {
                size: "md",
                iconPosition: "end",
                className: "pr-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] [&>svg]:ml-xs"
            },
            {
                size: "lg",
                iconPosition: "start",
                className:
                    "pl-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))] [&>svg]:mr-xs-plus"
            },
            {
                size: "lg",
                iconPosition: "end",
                className:
                    "pr-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))] [&>svg]:ml-xs-plus"
            },
            {
                size: "xl",
                iconPosition: "start",
                className: "pl-[calc(theme(padding.sm-extra)-theme(borderWidth.md))] [&>svg]:mr-sm"
            },
            {
                size: "xl",
                iconPosition: "end",
                className: "pr-[calc(theme(padding.sm-extra)-theme(borderWidth.md))] [&>svg]:ml-sm"
            }
        ],
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
    const {
        className,
        variant,
        size,
        asChild = false,
        text,
        icon,
        iconPosition = "start",
        ...rest
    } = props;
    const Comp = asChild ? Slot : "button";

    const cssClasses = cn(
        buttonVariants({
            variant,
            size,
            iconPosition: icon ? iconPosition : undefined,
            className
        })
    );

    return (
        <Comp className={cssClasses} ref={ref} {...rest}>
            {iconPosition !== "end" && icon}
            {text}
            {iconPosition === "end" && icon}
        </Comp>
    );
});

ButtonBase.displayName = "Button";

const Button = makeDecoratable("Button", ButtonBase);

export { Button, type ButtonProps };
