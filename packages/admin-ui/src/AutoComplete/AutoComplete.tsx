import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { AutoCompletePrimitive, AutoCompletePrimitiveProps } from "./AutoCompletePrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type AutoCompleteProps = AutoCompletePrimitiveProps & FormComponentProps;

const DecoratableAutoComplete = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: AutoCompleteProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <AutoCompletePrimitive {...props} disabled={disabled} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};

const AutoComplete = makeDecoratable("AutoComplete", DecoratableAutoComplete);

export { AutoComplete };
