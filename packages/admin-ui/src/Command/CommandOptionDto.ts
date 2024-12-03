export interface CommandOptionDto {
    label: string;
    value?: string;
    options?: CommandOptionDto[];
    disabled?: boolean;
    selected?: boolean;
    separator?: boolean;
}
