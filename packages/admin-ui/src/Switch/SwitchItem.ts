import { SwitchItemDto } from "./SwitchItemDto";
import { generateId } from "~/utils";

export class SwitchItem {
    private readonly _id: string;
    private readonly _label: any;
    private readonly _value: string | number;
    private readonly _checked: boolean;
    private readonly _disabled: boolean;

    protected constructor(data: {
        id: string;
        label: any;
        value: any;
        checked: boolean;
        disabled: boolean;
    }) {
        this._id = data.id;
        this._label = data.label;
        this._value = data.value;
        this._checked = data.checked;
        this._disabled = data.disabled;
    }

    static create(data: SwitchItemDto): SwitchItem {
        return new SwitchItem({
            id: generateId(data.id),
            label: data.label,
            value: data.value,
            checked: Boolean(data.checked),
            disabled: data.disabled ?? false
        });
    }

    get id() {
        return this._id;
    }

    get label() {
        return this._label;
    }

    get value() {
        return this._value;
    }

    get checked() {
        return this._checked;
    }

    get disabled() {
        return this._disabled;
    }
}
