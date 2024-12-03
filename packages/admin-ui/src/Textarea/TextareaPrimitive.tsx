import * as React from "react";
import { makeDecoratable, cva, type VariantProps, cn } from "~/utils";

const textareaVariants = cva(
    [
        "flex min-h-[80px] w-full border-sm text-md focus-visible:outline-none disabled:cursor-not-allowed"
    ],
    {
        variants: {
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
            size: {
                md: ["px-sm-extra py-xs-plus rounded-sm"],
                lg: ["px-sm-extra py-sm-plus rounded-sm"],
                xl: ["px-md-extra p-md rounded-md"]
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
            // Add specific classNames in case of invalid `ghost` textarea.
            {
                variant: "ghost",
                invalid: true,
                class: [
                    "border-destructive-subtle bg-destructive-subtle",
                    "hover:border-destructive-subtle hover:bg-destructive-subtle",
                    "focus:border-destructive-subtle  focus:bg-destructive-subtle",
                    "disabled:bg-destructive-subtle disabled:border-destructive-subtle"
                ]
            }
        ],
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    }
);

type TextareaPrimitiveProps = React.ComponentProps<"textarea"> &
    VariantProps<typeof textareaVariants>;

const DecoratableTextareaPrimitive = React.forwardRef<HTMLTextAreaElement, TextareaPrimitiveProps>(
    ({ className, variant, invalid, size, ...props }, ref) => {
        return (
            <textarea
                className={cn(textareaVariants({ variant, invalid, size }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);
DecoratableTextareaPrimitive.displayName = "TextareaPrimitive";
const TextareaPrimitive = makeDecoratable("TextareaPrimitive", DecoratableTextareaPrimitive);

export { TextareaPrimitive, type TextareaPrimitiveProps };
