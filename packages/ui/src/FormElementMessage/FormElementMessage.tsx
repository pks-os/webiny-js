import React from "react";
import classnames from "classnames";
import { FormComponentErrorMessage, FormComponentNote } from "@webiny/admin-ui";

type Props = {
    // message to display
    children: React.ReactNode;

    // optional class name
    className?: string;

    // is it an error message we're displaying
    error?: boolean;
};

const FormElementMessage = (props: Props) => {
    const classNames = classnames(
        "mdc-text-field-helper-text mdc-text-field-helper-text--persistent",
        props.className,
        { "mdc-text-field-helper-text--error": props.error }
    );

    if (props.error) {
        return (
            <FormComponentErrorMessage
                className={classNames}
                invalid={props.error}
                text={props.children}
            />
        );
    }

    return <FormComponentNote className={classNames} text={props.children} />;
};

export { FormElementMessage };
