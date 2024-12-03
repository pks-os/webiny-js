import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { SelectPrimitive, SelectPrimitiveProps } from "~/Select";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type SelectGroupProps = SelectPrimitiveProps & FormComponentProps;

const DecoratableSelect = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: SelectGroupProps) => {
    {
        const { isValid: validationIsValid, message: validationMessage } = validation || {};
        const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

        return (
            <div className={"w-full"}>
                <FormComponentLabel text={label} required={required} disabled={disabled} />
                <FormComponentDescription text={description} />
                <SelectPrimitive {...props} disabled={disabled} />
                <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
                <FormComponentNote text={note} />
            </div>
        );
    }
};
const Select = makeDecoratable("Select", DecoratableSelect);

export { Select };
