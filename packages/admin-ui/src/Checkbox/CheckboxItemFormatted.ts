import React from "react";

export interface CheckboxItemFormatted {
    id: string;
    label: string | React.ReactNode;
    value: string | number;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
}
