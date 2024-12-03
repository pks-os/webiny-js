export interface CommandOptionFormatted {
    label: string;
    value: string | null;
    options: CommandOptionFormatted[];
    disabled: boolean;
    selected: boolean;
    separator: boolean;
}
