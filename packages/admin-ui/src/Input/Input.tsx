import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { InputPrimitive, InputPrimitiveProps } from "./InputPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type InputProps = InputPrimitiveProps & FormComponentProps;

const DecoratableInput = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: InputProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <InputPrimitive {...props} disabled={disabled} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const Input = makeDecoratable("Input", DecoratableInput);

export { Input };
