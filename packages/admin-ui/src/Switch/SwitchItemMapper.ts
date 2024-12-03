import { SwitchItemFormatted } from "./SwitchItemFormatted";
import { SwitchItem } from "./SwitchItem";

export class SwitchItemMapper {
    static toFormatted(item: SwitchItem): SwitchItemFormatted {
        return {
            id: item.id,
            label: item.label,
            value: item.value,
            checked: item.checked,
            disabled: item.disabled
        };
    }
}
