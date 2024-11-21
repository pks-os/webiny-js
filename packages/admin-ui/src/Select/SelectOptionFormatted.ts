export interface SelectOptionFormatted {
    label: string;
    value: string | null;
    options: SelectOptionFormatted[];
    disabled: boolean;
    separator: boolean;
}
