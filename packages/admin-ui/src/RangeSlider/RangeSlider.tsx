import * as React from "react";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";
import { RangeSliderPrimitiveProps, RangeSliderPrimitiveRenderer } from "./RangeSliderPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";
import { useRangeSlider } from "~/RangeSlider/useRangeSlider";

/**
 * Range Slider Value
 */
const rangeSliderValueVariants = cva("font-normal text-sm leading-none", {
    variants: {
        disabled: {
            true: "text-neutral-disabled cursor-not-allowed"
        }
    }
});

interface RangeSliderValueProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof rangeSliderValueVariants> {
    value: string;
}

const DecoratableRangeSliderValue = ({ value, disabled, className }: RangeSliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(rangeSliderValueVariants({ disabled }), className)}>{value}</span>;
};

const RangeSliderValue = makeDecoratable("RangeSliderValue", DecoratableRangeSliderValue);

interface RangeSliderProps extends RangeSliderPrimitiveProps, FormComponentProps {
    label: React.ReactNode;
    valueConverter?: (value: number) => string;
}

const DecoratableRangeSlider = (props: RangeSliderProps) => {
    const { isValid: validationIsValid, message: validationMessage } = props.validation || {};
    const invalid = React.useMemo(() => validationIsValid === false, [validationIsValid]);
    const { vm, changeValues, commitValues } = useRangeSlider(props);

    return (
        <div className={"w-full"}>
            <FormComponentLabel
                text={props.label}
                required={props.required}
                disabled={props.disabled}
            />
            <FormComponentDescription text={props.description} />
            <div className={"flex flex-row items-center justify-between"}>
                <div className={"basis-1/12 pr-xxs"}>
                    <RangeSliderValue value={vm.textValues[0]} disabled={props.disabled} />
                </div>
                <div className={"basis-10/12"}>
                    <RangeSliderPrimitiveRenderer
                        {...props}
                        {...vm}
                        onValueChange={changeValues}
                        onValueCommit={commitValues}
                    />
                </div>
                <div className={"basis-1/12 pl-xxs text-right"}>
                    <RangeSliderValue value={vm.textValues[1]} disabled={props.disabled} />
                </div>
            </div>
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={props.note} />
        </div>
    );
};

const RangeSlider = makeDecoratable("RangeSlider", DecoratableRangeSlider);

export { RangeSlider, type RangeSliderProps };
