import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { TextareaPrimitive, TextareaPrimitiveProps } from "./TextareaPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type TextareaGroupProps = TextareaPrimitiveProps & FormComponentProps;

const DecoratableTextarea = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: TextareaGroupProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"w-full"}>
            <FormComponentLabel text={label} required={required} disabled={disabled} />
            <FormComponentDescription text={description} />
            <TextareaPrimitive {...props} disabled={disabled} />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const Textarea = makeDecoratable("Textarea", DecoratableTextarea);

export { Textarea };
