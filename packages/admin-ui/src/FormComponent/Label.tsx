import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { Label, LabelProps } from "~/Label";

interface FormComponentLabelProps {
    text?: React.ReactElement<typeof Label> | React.ReactNode;
    required?: boolean;
    disabled?: boolean;
}

const DecoratableFormComponentLabel = (props: FormComponentLabelProps) => {
    const { text, required, disabled } = props;

    // UseMemo correctly to memoize the rendered label
    const renderLabel = useMemo(() => {
        if (!text) {
            return null;
        }

        if (React.isValidElement(text) && text.type === Label) {
            return React.cloneElement(text as React.ReactElement<LabelProps>, {
                required,
                disabled
            });
        }

        return <Label text={text} required={required} disabled={disabled} />;
    }, [text, required, disabled]);

    if (!renderLabel) {
        return null;
    }

    return <span className={"py-xs pr-xs"}>{renderLabel}</span>;
};

const FormComponentLabel = makeDecoratable("FormComponentLabel", DecoratableFormComponentLabel);

export { FormComponentLabel, type FormComponentLabelProps };
