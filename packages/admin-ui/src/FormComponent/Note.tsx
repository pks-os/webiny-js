import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface FormComponentNoteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    text?: React.ReactNode;
}

const DecoratableFormComponentNote = (props: FormComponentNoteProps) => {
    if (!props.text) {
        return null;
    }

    return (
        <Text text={props.text} size={"sm"} as={"div"} className={"mt-sm text-neutral-strong"} />
    );
};

const FormComponentNote = makeDecoratable("FormComponentNote", DecoratableFormComponentNote);

export { FormComponentNote, type FormComponentNoteProps };
