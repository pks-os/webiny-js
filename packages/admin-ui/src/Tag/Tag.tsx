import * as React from "react";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";
import { Icon } from "~/Icon";

const tagVariants = cva(
    [
        "inline-flex items-center gap-xxs rounded-sm text-sm text-regular transition-colors cursor-default",
        "focus:outline-none",
        "aria-disabled:cursor-not-allowed"
    ],
    {
        variants: {
            hasIcon: {
                true: "pl-xs-plus pt-xxs pb-xxs pr-xxs",
                false: "pl-xs-plus pr-xs-plus pt-xxs pb-xxs"
            },
            variant: {
                "neutral-base": [
                    "border-sm px-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] py-[calc(theme(padding.xxs)-theme(borderWidth.sm))]",
                    "bg-transparent border-neutral-muted text-neutral-primary fill-neutral-xstrong/50",
                    "hover:bg-neutral-light",
                    "aria-disabled:bg-transparent aria-disabled:border-neutral-dimmed aria-disabled:text-neutral-disabled aria-disabled:fill-neutral-xstrong/25"
                ],
                "neutral-light": [
                    "bg-neutral-muted text-neutral-primary fill-neutral-xstrong/50",
                    "hover:bg-neutral-strong",
                    "aria-disabled:bg-neutral-muted aria-disabled:text-neutral-muted aria-disabled:fill-neutral-xstrong/25"
                ],
                "neutral-strong": [
                    "bg-neutral-xstrong text-neutral-light fill-neutral-base/60",
                    "hover:bg-neutral-dark",
                    "aria-disabled:bg-neutral-strong aria-disabled:fill-neutral-base/50"
                ],
                "neutral-dark": [
                    "bg-neutral-dark text-neutral-light fill-neutral-base/60",
                    "hover:bg-neutral-xstrong",
                    "aria-disabled:bg-neutral-strong aria-disabled:fill-neutral-base/50"
                ],
                accent: [
                    "bg-primary-default text-neutral-light fill-neutral-base/60",
                    "hover:bg-primary-strong",
                    "aria-disabled:bg-primary-disabled aria-disabled:fill-neutral-base/50"
                ],
                success: [
                    "bg-success-default text-neutral-light fill-neutral-base/60",
                    "hover:bg-success-strong",
                    "aria-disabled:bg-success-disabled aria-disabled:fill-neutral-base/50"
                ],
                warning: [
                    "bg-warning-muted text-neutral-primary fill-neutral-xstrong/50",
                    "hover:bg-warning-default",
                    "aria-disabled:bg-warning-disabled aria-disabled:text-neutral-disabled aria-disabled:fill-neutral-xstrong/25"
                ],
                destructive: [
                    "bg-destructive-default text-neutral-light fill-neutral-base fill-neutral-base/60",
                    "hover:bg-destructive-strong",
                    "aria-disabled:bg-destructive-disabled aria-disabled:fill-neutral-base/50"
                ]
            }
        },
        defaultVariants: {
            variant: "neutral-base"
        }
    }
);

export interface TagProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
        VariantProps<typeof tagVariants> {
    label: string;
    icon: React.ReactElement<typeof Icon>;
    disabled?: boolean;
}

const DecoratableTag = ({ className, variant, label, icon, disabled, ...props }: TagProps) => {
    const hasIcon = React.useMemo(() => Boolean(icon), [icon]);

    return (
        <span
            {...props}
            className={cn(tagVariants({ variant, hasIcon }), className)}
            aria-disabled={disabled}
        >
            {label} {icon}
        </span>
    );
};
const Tag = makeDecoratable("Tag", DecoratableTag);

export { Tag };
