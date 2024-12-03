import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { SwitchPrimitive, SwitchPrimitiveProps } from "~/Switch";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type SwitchProps = SwitchPrimitiveProps & FormComponentProps;

const DecoratableSwitch = ({ description, note, validation, ...props }: SwitchProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentDescription text={description} />
            <SwitchPrimitive {...props} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};

const Switch = makeDecoratable("Switch", DecoratableSwitch);

export { Switch };
