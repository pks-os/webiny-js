import React from "react";
import { Alert as AdminUiAlert } from "@webiny/admin-ui";

export type AlertType = "success" | "info" | "warning" | "danger";

export interface AlertProps {
    // Alert title.
    title: string;

    // Alert type.
    type: AlertType;

    // Alert message.
    children?: React.ReactNode;

    // CSS class name
    className?: string;

    // Style object
    style?: React.CSSProperties;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Alert` component from the `@webiny/admin-ui` package instead.
 */
const Alert = (props: AlertProps) => {
    const { title, type, children, ...rest } = props;

    return (
        <AdminUiAlert type={type} variant={"strong"} {...rest}>
            <div>
                <strong>{title}</strong>
            </div>
            <div>{children}</div>
        </AdminUiAlert>
    );
};

export { Alert };
