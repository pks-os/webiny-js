import React from "react";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils";

const iconVariants = cva("", {
    variants: {
        size: {
            sm: "size-md",
            md: "size-md-plus",
            lg: "size-lg"
        },
        color: {
            accent: "fill-accent-default",
            neutral: "fill-neutral-base",
            "neutral-strong": "fill-neutral-strong",
            "neutral-xstrong": "fill-neutral-xstrong"
        }
    },
    defaultVariants: {
        size: "md",
        color: "accent"
    }
});

interface IconProps
    extends Omit<React.HTMLAttributes<HTMLOrSVGElement>, "color">,
        VariantProps<typeof iconVariants> {
    label: string;
    icon: React.ReactElement;
}

const IconBase = React.forwardRef<HTMLOrSVGElement, IconProps>((props, ref) => {
    const { label, icon, color, size, className, ...rest } = props;
    return (
        <AccessibleIcon.Root label={label}>
            {React.cloneElement(icon, {
                ...rest,
                className: cn(iconVariants({ color, size, className })),
                ref
            })}
        </AccessibleIcon.Root>
    );
});

IconBase.displayName = "Icon";

const Icon = makeDecoratable("Icon", IconBase);

export { Icon, type IconProps };
