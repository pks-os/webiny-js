import React from "react";
import { FormComponentProps } from "~/types";
import {
    DeprecatedRadioGroup as DeprecatedAdminRadioGroup,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote
} from "@webiny/admin-ui";

interface RadioGroupRenderParams {
    onChange: (value: string | number) => () => void;
    getValue: (value: string | number) => string | number;
}

type Props = FormComponentProps & {
    // Form element's label.
    label?: string;

    // Form element's description.
    description?: string;

    // An array of Radio components.
    children: (props: RadioGroupRenderParams) => React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `RadioGroup` component props from the `@webiny/admin-ui` package instead.
 */
class RadioGroup extends React.Component<Props> {
    public override render() {
        const { description, label, validation, value, onChange } = this.props;

        const { isValid: validationIsValid, message: validationMessage } = validation || {};

        return (
            <div className={"w-full"}>
                <FormComponentLabel text={label} />
                <DeprecatedAdminRadioGroup value={value} onValueChange={onChange}>
                    {this.props.children({
                        onChange: value => () => this.props.onChange && this.props.onChange(value),
                        getValue: value => value
                    })}
                </DeprecatedAdminRadioGroup>
                <FormComponentErrorMessage
                    text={validationMessage}
                    invalid={validationIsValid === false}
                />
                <FormComponentNote text={description} />
            </div>
        );
    }
}

export default RadioGroup;
