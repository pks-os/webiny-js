import { SelectOption } from "./SelectOption";
import { SelectOptionFormatted } from "./SelectOptionFormatted";

export class SelectOptionMapper {
    static toFormatted(option: SelectOption): SelectOptionFormatted {
        return {
            label: option.label,
            value: option.value,
            disabled: option.disabled,
            separator: option.separator,
            options: option.options.map(option => SelectOptionMapper.toFormatted(option))
        };
    }
}
