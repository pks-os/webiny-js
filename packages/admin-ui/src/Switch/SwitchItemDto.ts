import React from "react";

export interface SwitchItemDto {
    id?: string;
    label: React.ReactNode;
    value?: number | string;
    checked?: boolean;
    disabled?: boolean;
}
