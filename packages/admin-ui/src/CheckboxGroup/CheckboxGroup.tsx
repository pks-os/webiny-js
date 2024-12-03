import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { CheckboxGroupPrimitive, CheckboxGroupPrimitiveProps } from "~/CheckboxGroup";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type CheckboxGroupProps = CheckboxGroupPrimitiveProps & FormComponentProps;

const DecoratableCheckboxGroup = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: CheckboxGroupProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <CheckboxGroupPrimitive {...props} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const CheckboxGroup = makeDecoratable("CheckboxGroup", DecoratableCheckboxGroup);

export { CheckboxGroup };
