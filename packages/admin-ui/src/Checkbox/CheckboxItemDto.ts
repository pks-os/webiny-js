import React from "react";

export interface CheckboxItemDto {
    id?: string;
    label: string | React.ReactNode;
    value?: number | string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}
