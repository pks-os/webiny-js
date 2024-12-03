import * as React from "react";
import * as SliderPrimitives from "@radix-ui/react-slider";
import {
    SliderPrimitiveRoot,
    SliderPrimitiveThumb,
    SliderPrimitiveThumbProps,
    SliderPrimitiveTrack
} from "~/Slider";
import { makeDecoratable } from "~/utils";
import { useRangeSlider } from "./useRangeSlider";

interface RangeSliderPrimitiveRootProps
    extends Omit<SliderPrimitives.SliderProps, "min" | "max" | "value"> {
    values: number[];
    min: number;
    max: number;
}

interface RangeSliderPrimitiveThumbProps extends Omit<SliderPrimitiveThumbProps, "labelValue"> {
    textValues: string[];
}

interface RangeSliderPrimitiveVm
    extends RangeSliderPrimitiveRootProps,
        Omit<RangeSliderPrimitiveThumbProps, "textValue"> {
    textValues: string[];
}

/**
 * RangeSliderRenderer
 */

const DecoratableRangeSliderPrimitiveRenderer = ({
    tooltipSide,
    textValues,
    showTooltip,
    values,
    ...sliderProps
}: RangeSliderPrimitiveVm) => {
    return (
        <div className={"flex h-md w-full"}>
            <SliderPrimitiveRoot {...sliderProps} value={values}>
                <SliderPrimitiveTrack />
                <SliderPrimitiveThumb
                    showTooltip={showTooltip}
                    tooltipSide={tooltipSide}
                    textValue={textValues[0]}
                />
                <SliderPrimitiveThumb
                    showTooltip={showTooltip}
                    tooltipSide={tooltipSide}
                    textValue={textValues[1]}
                />
            </SliderPrimitiveRoot>
        </div>
    );
};

const RangeSliderPrimitiveRenderer = makeDecoratable(
    "RangeSliderPrimitiveRenderer",
    DecoratableRangeSliderPrimitiveRenderer
);

/**
 * RangeSlider
 */
interface RangeSliderPrimitiveProps
    extends Omit<
        SliderPrimitives.SliderProps,
        "defaultValue" | "value" | "onValueChange" | "onValueCommit"
    > {
    onValuesChange: (values: number[]) => void;
    onValuesCommit?: (values: number[]) => void;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
    transformValue?: (value: number) => string;
    values?: number[];
}

const DecoratableRangeSliderPrimitive = (props: RangeSliderPrimitiveProps) => {
    const { vm, changeValues, commitValues } = useRangeSlider(props);

    return (
        <RangeSliderPrimitiveRenderer
            {...props}
            {...vm}
            onValueChange={changeValues}
            onValueCommit={commitValues}
        />
    );
};

const RangeSliderPrimitive = makeDecoratable(
    "RangeSliderPrimitive",
    DecoratableRangeSliderPrimitive
);

export {
    RangeSliderPrimitive,
    RangeSliderPrimitiveRenderer,
    type RangeSliderPrimitiveProps,
    type RangeSliderPrimitiveVm
};
