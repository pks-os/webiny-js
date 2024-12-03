import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { CheckboxPrimitive, CheckboxPrimitiveProps } from "~/Checkbox";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type CheckboxProps = CheckboxPrimitiveProps & FormComponentProps;

const DecoratableCheckbox = ({ description, note, validation, ...props }: CheckboxProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentDescription text={description} />
            <CheckboxPrimitive {...props} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const Checkbox = makeDecoratable("Checkbox", DecoratableCheckbox);

export { Checkbox };
