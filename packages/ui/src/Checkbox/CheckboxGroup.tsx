import React from "react";
import { FormComponentProps } from "~/types";
import { FormComponentErrorMessage, FormComponentLabel, FormComponentNote } from "@webiny/admin-ui";

export interface ChildrenRenderProp {
    onChange: (id: string | number) => () => void;
    getValue: (id: string | number) => boolean;
}

type Props = FormComponentProps & {
    // Form element's label.
    label?: string;

    // Form element's description.
    description?: string;

    // An array of Checkbox components.
    children: (props: ChildrenRenderProp) => React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `CheckboxGroup` component from the `@webiny/admin-ui` package instead.
 */
class CheckboxGroup extends React.Component<Props> {
    public override render() {
        const { description, label, validation } = this.props;
        const { isValid: validationIsValid, message: validationMessage } = validation || {};

        return (
            <div className={"w-full"}>
                <FormComponentLabel text={label} />
                {this.props.children({
                    onChange: value => {
                        return () => {
                            const values = Array.isArray(this.props.value)
                                ? [...this.props.value]
                                : [];
                            const index = values.indexOf(value);
                            if (index > -1) {
                                values.splice(index, 1);
                            } else {
                                values.push(value);
                            }

                            this.props.onChange && this.props.onChange(values);
                        };
                    },
                    getValue: id => {
                        const values = Array.isArray(this.props.value) ? this.props.value : [];
                        return values.includes(id);
                    }
                })}
                <FormComponentErrorMessage
                    invalid={Boolean(validationIsValid === false)}
                    text={validationMessage}
                />
                <FormComponentNote text={description} />
            </div>
        );
    }
}

export default CheckboxGroup;
