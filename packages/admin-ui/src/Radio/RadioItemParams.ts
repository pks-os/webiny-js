import React from "react";

export interface RadioItemParams {
    id?: string;
    label: string | React.ReactNode;
    value: string;
    disabled?: boolean;
}
