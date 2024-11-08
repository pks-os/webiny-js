import * as React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { Label } from "~/Label";
import { RangeSliderProps as BaseRangeSliderProps, RangeSliderRenderer } from "~/RangeSlider";
import { useRangeSlider } from "~/Form/RangeSlider/useRangeSlider";

type RangeSliderLabelVm = {
    label: React.ReactNode;
    values: string[];
};

/**
 * Range Slider Value
 */
interface RangeSliderValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    value: string;
}

const RangeSliderBaseValue = (props: RangeSliderValueProps) => (
    <span className={"font-normal text-sm leading-none"}>{props.value}</span>
);

const RangeSliderValue = makeDecoratable("RangeSliderValue", RangeSliderBaseValue);

interface RangeSliderProps extends BaseRangeSliderProps {
    label: React.ReactNode;
    valueConverter?: (value: number) => string;
}

const DecoratableFormRangeSlider = (props: RangeSliderProps) => {
    const { vm, changeValues, commitValues } = useRangeSlider(props);

    return (
        <div className={"w-full"}>
            <div>
                <Label text={vm.labelVm.label} weight={"light"} />
            </div>
            <div className={"flex flex-row items-center justify-between"}>
                <div className={"basis-1/12 pr-2"}>
                    <RangeSliderValue value={vm.labelVm.values[0]} />
                </div>
                <div className={"basis-10/12"}>
                    <RangeSliderRenderer
                        sliderVm={vm.sliderVm}
                        thumbsVm={vm.thumbsVm}
                        onValuesChange={changeValues}
                        onValuesCommit={commitValues}
                    />
                </div>
                <div className={"basis-1/12 pl-2 text-right"}>
                    <RangeSliderValue value={vm.labelVm.values[1]} />
                </div>
            </div>
        </div>
    );
};

const RangeSlider = makeDecoratable("RangeSlider", DecoratableFormRangeSlider);

export { RangeSlider, type RangeSliderProps, type RangeSliderLabelVm };
