import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils";
import { useSlider } from "./useSlider";
import { Text } from "~/Text";

type SliderVm = Omit<SliderPrimitive.SliderProps, "min"> & {
    min: number;
};

/**
 * Slider Root
 */
const DecoratableSliderRoot = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center cursor-pointer data-[disabled]:cursor-auto",
            className
        )}
        {...props}
    />
));

DecoratableSliderRoot.displayName = SliderPrimitive.Root.displayName;

const SliderRoot = makeDecoratable("SliderRoot", DecoratableSliderRoot);

/**
 * Slider Track
 */
const DecoratableSliderTrack = () => (
    <SliderPrimitive.Track className="relative h-xxs w-full grow overflow-hidden rounded-full bg-neutral-strong data-[disabled]:bg-neutral-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary-default data-[disabled]:bg-primary-disabled" />
    </SliderPrimitive.Track>
);

const SliderTrack = makeDecoratable("SliderTrack", DecoratableSliderTrack);

/**
 * Slider Tooltip
 */
const sliderTooltipVariants = cva(
    "bg-neutral-muted px-xs-plus py-xxs rounded-sm absolute left-1/2 -translate-x-1/2",
    {
        variants: {
            side: {
                top: "bottom-8",
                bottom: "top-8"
            }
        },
        defaultVariants: {
            side: "bottom"
        }
    }
);

type SliderTooltipProps = VariantProps<typeof sliderTooltipVariants> & {
    value?: string;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
};

const DecoratableSliderTooltip = ({ value, showTooltip, tooltipSide }: SliderTooltipProps) => {
    if (!value || !showTooltip) {
        return null;
    }

    return (
        <div className={cn(sliderTooltipVariants({ side: tooltipSide }))}>
            <Text text={value} size={"sm"} />
        </div>
    );
};

const SliderTooltip = makeDecoratable("SliderTooltip", DecoratableSliderTooltip);

/**
 * Slider Thumb
 */
type SliderThumbVm = SliderTooltipProps;

const DecoratableSliderThumb = ({ value, showTooltip, tooltipSide }: SliderThumbVm) => (
    <SliderPrimitive.Thumb className="inline-block mt-xs-plus h-md w-md rounded-xxl border-md border-white bg-primary-default transition-colors outline-none hover:bg-primary-strong active:bg-primary-default data-[disabled]:pointer-events-none data-[disabled]:bg-primary-disabled">
        <SliderTooltip showTooltip={showTooltip} value={value} tooltipSide={tooltipSide} />
    </SliderPrimitive.Thumb>
);

const SliderThumb = makeDecoratable("SliderThumb", DecoratableSliderThumb);

/**
 * SliderRenderer
 */
interface SliderRendererProps {
    sliderVm: SliderVm;
    thumbVm: SliderThumbVm;
    onValueChange: (values: number[]) => void;
    onValueCommit: (values: number[]) => void;
}

const DecoratableSliderRenderer = ({
    sliderVm,
    thumbVm,
    onValueChange,
    onValueCommit
}: SliderRendererProps) => {
    return (
        <SliderRoot {...sliderVm} onValueChange={onValueChange} onValueCommit={onValueCommit}>
            <SliderTrack />
            <SliderThumb {...thumbVm} />
        </SliderRoot>
    );
};

const SliderRenderer = makeDecoratable("SliderRenderer", DecoratableSliderRenderer);

/**
 * Slider
 */
interface SliderProps
    extends Omit<
        SliderPrimitive.SliderProps,
        "defaultValue" | "value" | "onValueChange" | "onValueCommit"
    > {
    onValueChange: (value: number) => void;
    onValueCommit?: (value: number) => void;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
    transformValue?: (value: number) => string;
    value?: number;
}

const DecoratableSlider = (props: SliderProps) => {
    const { vm, changeValue, commitValue } = useSlider(props);
    return (
        <SliderRenderer
            sliderVm={vm.sliderVm}
            thumbVm={vm.thumbVm}
            onValueChange={changeValue}
            onValueCommit={commitValue}
        />
    );
};

const Slider = makeDecoratable("Slider", DecoratableSlider);

export {
    Slider,
    SliderRenderer,
    SliderRoot,
    SliderTrack,
    SliderThumb,
    type SliderVm,
    type SliderProps,
    type SliderThumbVm
};
