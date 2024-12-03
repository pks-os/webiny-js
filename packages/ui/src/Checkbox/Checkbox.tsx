import React from "react";
import { FormComponentProps } from "~/types";
import { Checkbox as AdminCheckbox } from "@webiny/admin-ui";

interface Props extends FormComponentProps {
    // Component id.
    id?: string;

    // Component label.
    label?: string;

    // Is checkbox disabled?
    disabled?: boolean;

    // onClick callback.
    onClick?: (value: boolean) => void;

    // Use when checkbox is not checked nor unchecked.
    indeterminate?: boolean;

    // Description beneath the checkbox.
    description?: string;

    // For testing purposes.
    "data-testid"?: string;

    children?: React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Checkbox` component from the `@webiny/admin-ui` package instead.
 */
class Checkbox extends React.Component<Props> {
    onChange = (checked: boolean) => {
        this.props.onChange && this.props.onChange(checked);
    };

    public override render() {
        const { id, value, label, disabled, indeterminate, description, validation, onClick } =
            this.props;

        return (
            <AdminCheckbox
                id={id}
                indeterminate={indeterminate}
                disabled={disabled}
                checked={Boolean(value)}
                onCheckedChange={this.onChange}
                onClick={() => typeof onClick === "function" && onClick(Boolean(value))}
                label={label}
                data-testid={this.props["data-testid"]}
                note={description}
                validation={validation}
            />
        );
    }
}

export default Checkbox;
