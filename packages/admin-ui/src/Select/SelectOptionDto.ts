export interface SelectOptionDto {
    label: string;
    value?: string;
    options?: SelectOptionDto[];
    disabled?: boolean;
    separator?: boolean;
}
