import React from "react";

export interface SwitchItemFormatted {
    id: string;
    label: string | React.ReactNode;
    value: string | number;
    checked: boolean;
    disabled: boolean;
}
