import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, withStaticProps } from "~/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Tooltip Content
 */
const tooltipContentVariants = cva(
    [
        "z-50 px-sm-extra py-sm max-w-64 rounded-md text-sm animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    ],
    {
        variants: {
            variant: {
                accent: "bg-neutral-dark text-neutral-light",
                subtle: "bg-neutral-base text-neutral-primary shadow-md"
            },
            // In case of hidden arrow, let's add some spacing from the trigger.
            hiddenArrow: {
                true: [
                    "data-[side=top]:mb-xs-plus",
                    "data-[side=bottom]:mt-xs-plus",
                    "data-[side=left]:mr-xs-plus",
                    "data-[side=right]:ml-xs-plus"
                ]
            }
        },
        defaultVariants: {
            variant: "accent"
        }
    }
);

type TooltipContentProps = TooltipPrimitive.TooltipContentProps &
    VariantProps<typeof tooltipContentVariants>;

const DecoratableTooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    TooltipContentProps
>(({ className, variant, hiddenArrow, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={4}
        className={cn(tooltipContentVariants({ variant, hiddenArrow, className }))}
        {...props}
    />
));

DecoratableTooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipContent = makeDecoratable("TooltipArrow", DecoratableTooltipContent);

/**
 * Tooltip Arrow
 */
const tooltipArrowVariants = cva("", {
    variants: {
        variant: {
            accent: "fill-bg-neutral-dark",
            subtle: "fill-neutral-base"
        }
    },
    defaultVariants: {
        variant: "accent"
    }
});

type TooltipArrowProps = TooltipPrimitive.TooltipArrowProps &
    VariantProps<typeof tooltipArrowVariants>;

const DecoratableTooltipArrow = ({ variant, className, ...props }: TooltipArrowProps) => (
    <TooltipPrimitive.Arrow
        {...props}
        width={12}
        height={6}
        className={cn(tooltipArrowVariants({ variant, className }))}
    />
);

DecoratableTooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

const TooltipArrow = makeDecoratable("TooltipArrow", DecoratableTooltipArrow);

/**
 * Tooltip
 */
interface TooltipProps extends Omit<TooltipPrimitive.TooltipContentProps, "content" | "children"> {
    align?: TooltipPrimitive.TooltipContentProps["align"];
    content: React.ReactNode;
    onOpenChange?: TooltipPrimitive.TooltipProps["onOpenChange"];
    showArrow?: boolean;
    side?: TooltipPrimitive.TooltipContentProps["side"];
    variant?: TooltipContentProps["variant"];
    trigger: React.ReactNode;
}

const DecoratableTooltip = ({
    align,
    content,
    onOpenChange,
    showArrow = true,
    side,
    variant,
    trigger,
    ...props
}: TooltipProps) => {
    return (
        <TooltipRoot delayDuration={500} onOpenChange={onOpenChange}>
            <TooltipTrigger asChild>
                <span>{trigger}</span>
            </TooltipTrigger>
            <TooltipContent
                side={side}
                align={align}
                sideOffset={4}
                variant={variant}
                hiddenArrow={!showArrow}
                {...props}
            >
                {content}
                {showArrow && <TooltipArrow variant={variant} />}
            </TooltipContent>
        </TooltipRoot>
    );
};

const Tooltip = withStaticProps(makeDecoratable("Tooltip", DecoratableTooltip), {
    Provider: TooltipProvider
});

export { Tooltip, type TooltipProps };
