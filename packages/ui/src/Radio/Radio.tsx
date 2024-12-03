import React from "react";
import {
    FormComponentErrorMessage,
    FormComponentNote,
    Radio as AdminRadio
} from "@webiny/admin-ui";
import { FormComponentProps } from "~/types";
import { generateId } from "@webiny/admin-ui/utils";

type Props = FormComponentProps & {
    // Component label.
    label?: string;

    // Is radio disabled?
    disabled?: boolean;

    // Description beneath the radio.
    description?: string;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `Radio` component props from the `@webiny/admin-ui` package instead.
 */
class Radio extends React.Component<Props> {
    onChange = (e: React.SyntheticEvent<HTMLInputElement> | any) => {
        this.props.onChange && this.props.onChange((e.target as HTMLInputElement).checked);
    };

    public override render() {
        const { value, label, disabled, description, validation } = this.props;

        const { isValid: validationIsValid, message: validationMessage } = validation || {};

        return (
            <React.Fragment>
                <AdminRadio id={generateId()} disabled={disabled} value={value} label={label} />
                <FormComponentErrorMessage
                    invalid={Boolean(validationIsValid === false)}
                    text={validationMessage}
                />
                <FormComponentNote text={description} />
            </React.Fragment>
        );
    }
}

export default Radio;
