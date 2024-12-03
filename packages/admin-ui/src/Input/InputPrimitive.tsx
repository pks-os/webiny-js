import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon as BaseIcon } from "~/Icon";
import { cn, makeDecoratable } from "~/utils";

/**
 * Icon
 */
const iconVariants = cva("absolute transform top-1/2 -translate-y-1/2 fill-neutral-xstrong", {
    variants: {
        // Define dummy variants to be used in combination with `compoundVariants` below.
        inputSize: {
            md: "",
            lg: "",
            xl: ""
        },
        position: {
            start: "",
            end: ""
        },
        disabled: {
            true: "fill-neutral-disabled"
        }
    },
    defaultVariants: {
        inputSize: "md",
        position: "start"
    },
    compoundVariants: [
        // The icon position is `absolute` and is adjusted horizontally across its parent using left and right.
        {
            inputSize: "md",
            position: "start",
            class: "left-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "md",
            position: "end",
            class: "right-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "lg",
            position: "start",
            class: "left-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "lg",
            position: "end",
            class: "right-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "xl",
            position: "start",
            class: "left-[calc(theme(spacing.md)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "xl",
            position: "end",
            class: "right-[calc(theme(spacing.md)-theme(borderWidth.sm))]"
        }
    ]
});

interface IconWrapperProps extends VariantProps<typeof iconVariants> {
    icon: React.ReactElement;
    disabled?: boolean;
}

const Icon = ({ icon, disabled, position, inputSize }: IconWrapperProps) => {
    return (
        <div className={cn(iconVariants({ position, disabled, inputSize }))}>
            {React.cloneElement(icon, {
                ...icon.props,
                size: inputSize === "xl" ? "lg" : "sm" // Map icon size based on the input size.
            })}
        </div>
    );
};

/**
 * Input
 */
const inputVariants = cva(
    [
        "w-full border-sm text-md",
        "focus-visible:outline-none",
        "disabled:cursor-not-allowed",
        "file:bg-transparent file:border-none file:text-sm file:font-semibold"
    ],
    {
        variants: {
            size: {
                md: [
                    "rounded-md",
                    "py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                lg: [
                    "rounded-md",
                    "py-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                xl: [
                    "rounded-lg leading-6",
                    "py-[calc(theme(padding.md)-theme(borderWidth.sm))] px-[calc(theme(padding.md)-theme(borderWidth.sm))]"
                ]
            },
            variant: {
                primary: [
                    "bg-neutral-base border-neutral-muted text-neutral-strong placeholder:text-neutral-dimmed",
                    "hover:border-neutral-strong",
                    "focus:border-neutral-black",
                    "disabled:bg-neutral-disabled disabled:border-neutral-dimmed disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled"
                ],
                secondary: [
                    "bg-neutral-light border-neutral-subtle text-neutral-strong placeholder:text-neutral-dimmed",
                    "hover:bg-neutral-dimmed",
                    "focus:bg-neutral-base focus:border-neutral-black",
                    "disabled:bg-neutral-disabled disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled"
                ],
                ghost: [
                    "bg-transparent border-transparent text-neutral-strong placeholder:text-neutral-dimmed",
                    "hover:bg-neutral-dimmed/95",
                    "focus:bg-neutral-base focus:border-neutral-black",
                    "disabled:bg-transparent disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled"
                ]
            },
            iconPosition: {
                start: "pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                end: "pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                both: [
                    "pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                    "pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
                ]
            },
            invalid: {
                true: [
                    "border-destructive-default",
                    "hover:border-destructive-default",
                    "focus:border-destructive-default",
                    "disabled:border-destructive-default"
                ]
            }
        },
        compoundVariants: [
            // Prevent text overlap with icons, add extra padding for icons.
            {
                size: "lg",
                iconPosition: "start",
                class: "pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
            },
            {
                size: "lg",
                iconPosition: "end",
                class: "pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
            },
            {
                size: "lg",
                iconPosition: "both",
                class: [
                    "pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                    "pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
                ]
            },
            {
                size: "xl",
                iconPosition: "start",
                class: "pl-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]"
            },
            {
                size: "xl",
                iconPosition: "end",
                class: "pr-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]"
            },
            {
                size: "xl",
                iconPosition: "both",
                class: [
                    "pl-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]",
                    "pr-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]"
                ]
            },
            // Add specific classNames in case of invalid `ghost` input.
            {
                variant: "ghost",
                invalid: true,
                class: [
                    "border-destructive-subtle bg-destructive-subtle",
                    "hover:border-destructive-subtle",
                    "focus:border-destructive-subtle",
                    "disabled:bg-destructive-subtle disabled:border-destructive-subtle"
                ]
            }
        ],
        defaultVariants: {
            size: "md",
            variant: "primary"
        }
    }
);

interface InputPrimitiveProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
        VariantProps<typeof inputVariants> {
    startIcon?: React.ReactElement<typeof BaseIcon> | React.ReactElement;
    endIcon?: React.ReactElement<typeof BaseIcon> | React.ReactElement;
    maxLength?: React.InputHTMLAttributes<HTMLInputElement>["size"];
}

const getIconPosition = (
    startIcon?: InputPrimitiveProps["startIcon"],
    endIcon?: InputPrimitiveProps["endIcon"]
): "start" | "end" | "both" | undefined => {
    if (startIcon && endIcon) {
        return "both";
    }
    if (startIcon) {
        return "start";
    }
    if (endIcon) {
        return "end";
    }
    return;
};

const DecoratableInputPrimitive = React.forwardRef<HTMLInputElement, InputPrimitiveProps>(
    (
        { className, disabled, invalid, startIcon, maxLength, size, endIcon, variant, ...props },
        ref
    ) => {
        const iconPosition = getIconPosition(startIcon, endIcon);

        return (
            <div className={cn("relative flex items-center w-full", className)}>
                {startIcon && (
                    <Icon
                        disabled={disabled}
                        icon={startIcon}
                        inputSize={size}
                        position={"start"}
                    />
                )}
                <input
                    className={cn(inputVariants({ variant, size, iconPosition, invalid }))}
                    ref={ref}
                    disabled={disabled}
                    size={maxLength}
                    {...props}
                />
                {endIcon && (
                    <Icon disabled={disabled} icon={endIcon} inputSize={size} position={"end"} />
                )}
            </div>
        );
    }
);
DecoratableInputPrimitive.displayName = "InputPrimitive";

const InputPrimitive = makeDecoratable("InputPrimitive", DecoratableInputPrimitive);

export { InputPrimitive, type InputPrimitiveProps };
