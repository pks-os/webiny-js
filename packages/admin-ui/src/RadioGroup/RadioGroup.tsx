import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { RadioGroupPrimitive, RadioGroupPrimitiveProps } from "~/RadioGroup";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type RadioGroupProps = RadioGroupPrimitiveProps & FormComponentProps;

const DecoratableRadioGroup = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: RadioGroupProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <RadioGroupPrimitive {...props} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

export { RadioGroup };
