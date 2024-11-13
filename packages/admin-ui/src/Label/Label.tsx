import * as React from "react";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "~/Icon";
import { Text } from "~/Text";
import { Tooltip } from "~/Tooltip";
import { cn, makeDecoratable } from "~/utils";

/**
 * Label Required
 */
const labelRequiredVariants = cva("text-destructive-primary", {
    variants: {
        disabled: {
            true: "text-destructive-muted"
        }
    }
});

type LabelRequiredProps = VariantProps<typeof labelRequiredVariants>;

const DecoratableLabelRequired = ({ disabled }: LabelRequiredProps) => (
    <span className={cn(labelRequiredVariants({ disabled }))}>{"*"}</span>
);
const LabelRequired = makeDecoratable("LabelRequired", DecoratableLabelRequired);

/**
 * Label Description
 */
const labelDescriptionVariants = cva("font-normal text-neutral-muted", {
    variants: {
        disabled: {
            true: "text-neutral-disabled"
        }
    }
});

interface LabelDescriptionProps extends VariantProps<typeof labelDescriptionVariants> {
    content: React.ReactNode;
}

const DecoratableLabelDescription = ({ content, disabled }: LabelDescriptionProps) => (
    <Text className={cn(labelDescriptionVariants({ disabled }))} text={content} size={"sm"} />
);
const LabelDescription = makeDecoratable("LabelDescription", DecoratableLabelDescription);

/**
 * Label Hint
 */

interface LabelHintProps {
    content: React.ReactNode;
}

const DecoratableLabelHint = ({ content }: LabelHintProps) => (
    <Tooltip
        content={content}
        trigger={<Icon icon={<InfoIcon />} size="sm" label={"More information"} color={"light"} />}
    />
);
const LabelHint = makeDecoratable("LabelHint", DecoratableLabelHint);

/**
 * Label Value
 */
const labelValueVariants = cva("text-neutral-strong", {
    variants: {
        weight: {
            strong: "font-semibold",
            light: "font-regular"
        },
        disabled: {
            true: "text-neutral-disabled"
        }
    },
    defaultVariants: {
        weight: "strong"
    }
});

interface LabelValueProps extends VariantProps<typeof labelValueVariants> {
    value: React.ReactNode;
}

const DecoratableLabelValue = ({ value, weight, disabled }: LabelValueProps) => (
    <Text text={value} size="sm" className={cn(labelValueVariants({ weight, disabled }))} />
);
const LabelValue = makeDecoratable("LabelValue", DecoratableLabelValue);

const labelVariants = cva(
    [
        "inline-flex items-center justify-between w-full text-sm leading-none",
        "text-neutral-primary"
    ],
    {
        variants: {
            weight: {
                strong: "font-semibold",
                light: "font-regular"
            },
            disabled: {
                true: "text-neutral-disabled cursor-not-allowed"
            }
        },
        defaultVariants: {
            weight: "strong"
        }
    }
);

interface LabelProps
    extends Omit<React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, "children">,
        VariantProps<typeof labelVariants> {
    text: React.ReactNode;
    value?: React.ReactNode;
    description?: React.ReactNode;
    hint?: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
}

const LabelBase = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
    ({ className, disabled, description, hint, required, value, text, weight, ...props }, ref) => (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(labelVariants({ disabled, weight }), className)}
            {...props}
        >
            <span>
                <span className={"flex items-center gap-0.5"}>
                    {text}
                    {description && <LabelDescription content={description} disabled={disabled} />}
                    {hint && <LabelHint content={hint} />}
                    {required && <LabelRequired disabled={disabled} />}
                </span>
            </span>
            {value && <LabelValue value={value} weight={weight} disabled={disabled} />}
        </LabelPrimitive.Root>
    )
);
LabelBase.displayName = LabelPrimitive.Root.displayName;

const Label = makeDecoratable("Label", LabelBase);

export { Label, type LabelProps };
