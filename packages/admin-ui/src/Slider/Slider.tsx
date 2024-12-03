import * as React from "react";
import { Label } from "~/Label";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";
import {
    SliderPrimitiveRenderer,
    SliderPrimitiveProps,
    SliderPrimitiveRendererProps
} from "~/Slider";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";
import { useSlider } from "~/Slider/useSlider";

/**
 * Slider Value
 */
const sliderValueVariants = cva("font-normal text-sm leading-none", {
    variants: {
        disabled: {
            true: "text-neutral-disabled cursor-not-allowed"
        }
    }
});

interface SliderValueProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof sliderValueVariants> {
    value?: string;
}

const DecoratableSliderValue = ({ value, disabled, className }: SliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(sliderValueVariants({ disabled }), className)}>{value}</span>;
};
const SliderValue = makeDecoratable("SliderValue", DecoratableSliderValue);

/**
 * Slider Renderer with side label
 */
interface SliderRendererWithSideValueProps extends SliderPrimitiveRendererProps {
    label?: React.ReactNode;
    required?: boolean;
}

const DecoratableSliderRendererWithSideValue = (props: SliderRendererWithSideValueProps) => {
    return (
        <div className={"w-full flex flex-row items-center justify-between"}>
            <div className={"basis-2/12 pr-sm"}>
                <Label
                    text={props.label}
                    required={props.required}
                    disabled={props.disabled}
                    weight={"light"}
                />
            </div>
            <div className={"basis-9/12"}>
                <SliderPrimitiveRenderer {...props} />
            </div>
            <div className={"basis-1/12 pl-sm text-right"}>
                <SliderValue value={props.textValue} disabled={props.disabled} />
            </div>
        </div>
    );
};
const SliderRendererWithSideValue = makeDecoratable(
    "SliderRendererWithSideValue",
    DecoratableSliderRendererWithSideValue
);

/**
 * Slider
 */
interface SliderProps extends FormComponentProps, SliderPrimitiveProps {
    labelPosition?: "top" | "side";
}

const DecoratableSlider = ({ description, note, validation, ...props }: SliderProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = React.useMemo(() => validationIsValid === false, [validationIsValid]);
    const { vm, changeValue, commitValue } = useSlider(props);

    if (props.labelPosition === "side") {
        return (
            <div className={"w-full"}>
                <FormComponentDescription text={description} />
                <SliderRendererWithSideValue
                    {...props}
                    {...vm}
                    onValueChange={changeValue}
                    onValueCommit={commitValue}
                />
                <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
                <FormComponentNote text={note} />
            </div>
        );
    }

    return (
        <div className={"w-full"}>
            <FormComponentLabel
                text={<Label text={props.label} value={vm.textValue} />}
                disabled={props.disabled}
                required={props.required}
            />
            <FormComponentDescription text={description} />
            <SliderPrimitiveRenderer
                {...props}
                {...vm}
                onValueChange={changeValue}
                onValueCommit={commitValue}
            />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const Slider = makeDecoratable("Slider", DecoratableSlider);

export { Slider, type SliderProps };
