import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface FormComponentDescriptionProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    text?: React.ReactNode;
}

const DecoratableFormComponentDescription = (props: FormComponentDescriptionProps) => {
    if (!props.text) {
        return null;
    }

    return (
        <Text text={props.text} size={"sm"} as={"div"} className={"mb-sm text-neutral-strong"} />
    );
};

const FormComponentDescription = makeDecoratable(
    "FormComponentDescription",
    DecoratableFormComponentDescription
);

export { FormComponentDescription, type FormComponentDescriptionProps };
