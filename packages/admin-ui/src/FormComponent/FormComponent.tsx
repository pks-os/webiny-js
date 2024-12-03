import React from "react";
import { Label } from "~/Label";

interface FormComponentProps {
    /**
     * Label for the form component, which can be a React element of type `Label` or any React node.
     */
    label?: React.ReactElement<typeof Label> | React.ReactNode;

    /**
     * Description providing additional context or guidance for the form component.
     */
    description?: React.ReactNode;

    /**
     * Note or supplementary information to display below the form component.
     */
    note?: React.ReactNode;

    /**
     * Indicates whether the form component is required.
     */
    required?: boolean;

    /**
     * Indicates whether the form component is disabled, preventing user interaction.
     */
    disabled?: boolean;

    /**
     * Validation state for the form component. Provides details about validity,
     * error messages, and additional validation results.
     */
    validation?: {
        /**
         * Indicates whether the form component's value is valid.
         * Can be `true`, `false`, or `null` if not yet validated.
         */
        isValid: boolean | null;

        /**
         * Error message to display when the form component's value is invalid.
         */
        message?: string;

        /**
         * Additional results or metadata returned by the validation logic.
         */
        results?: { [key: string]: any };
    };

    /**
     * Function provided by the parent `<Form>` component to trigger validation when the form component's value changes.
     * Returns a promise that resolves with the validation result.
     */
    validate?: () => Promise<boolean | any>;
}

export { type FormComponentProps };
