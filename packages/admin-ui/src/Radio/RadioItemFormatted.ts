import React from "react";

export interface RadioItemFormatted {
    id: string;
    label: string | React.ReactNode;
    value: string;
    disabled: boolean;
}
