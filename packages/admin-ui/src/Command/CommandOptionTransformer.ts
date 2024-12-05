import { CommandOption } from "./CommandOption";
import { CommandOptionFormatted } from "./CommandOptionFormatted";
import { CommandOptionDto } from "./CommandOptionDto";

export class CommandOptionTransformer {
    static toFormatted(option: CommandOption): CommandOptionFormatted {
        return {
            label: option.label,
            value: option.value,
            disabled: option.disabled,
            selected: option.selected,
            separator: option.separator,
            options: option.options.map(option => CommandOptionTransformer.toFormatted(option))
        };
    }

    static toDto(option: CommandOption | CommandOptionFormatted): CommandOptionDto {
        return {
            label: option.label,
            value: option.value ?? undefined,
            disabled: option.disabled,
            selected: option.selected,
            separator: option.separator,
            options: option.options.map(option => CommandOptionTransformer.toDto(option))
        };
    }
}
