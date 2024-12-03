import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface FormComponentErrorMessageProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    text?: React.ReactNode;
    invalid?: boolean;
}

const DecoratableFormComponentErrorMessage = (props: FormComponentErrorMessageProps) => {
    if (!props.invalid || !props.text) {
        return null;
    }

    return (
        <Text
            text={props.text}
            size={"sm"}
            as={"div"}
            className={"mt-xs text-destructive-primary font-semibold"}
        />
    );
};

const FormComponentErrorMessage = makeDecoratable(
    "FormComponentErrorMessage",
    DecoratableFormComponentErrorMessage
);

export { FormComponentErrorMessage, type FormComponentErrorMessageProps };
