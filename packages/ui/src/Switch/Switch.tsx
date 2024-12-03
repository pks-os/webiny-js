import React from "react";
import { FormComponentProps } from "~/types";
import { Switch as AdminSwitch } from "@webiny/admin-ui";

type SwitchProps = {
    /** A DOM ID for the toggle. */
    id?: string;
    /** Disables the control. */
    disabled?: boolean;
    /** Toggle the control on and off. */
    checked?: boolean;
    /** The value of the control. */
    value?: string | number | string[];
    /** A label for the control. */
    label?: React.ReactNode;
    /** By default, all props except className and style spread to the input. These are additional props for the root of the checkbox. */
    rootProps?: React.HTMLProps<any>;
    /** A reference to the native input. */
    inputRef?: React.Ref<HTMLInputElement>;
};

type Props = Omit<SwitchProps, "value"> &
    FormComponentProps<boolean> & {
        // Description beneath the switch.
        description?: string;

        // Optional class name.
        className?: string;
    };

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Switch` component from the `@webiny/admin-ui` package instead.
 */
class Switch extends React.Component<Props> {
    public override render() {
        const { value, description, validation, label } = this.props;

        return (
            <AdminSwitch
                label={label}
                note={description}
                validation={validation}
                className={"webiny-ui-switch"}
                checked={Boolean(value)}
                value={String(value)}
                onCheckedChange={() => this.props.onChange && this.props.onChange(!value)}
            />
        );
    }
}

export { Switch };
