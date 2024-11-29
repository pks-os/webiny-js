import { CheckboxItemDto } from "./CheckboxItemDto";
import { generateId } from "~/utils";

export class CheckboxItem {
    private readonly _id: string;
    private readonly _label: any;
    private readonly _value: string | number;
    private readonly _checked: boolean;
    private readonly _indeterminate: boolean;
    private readonly _disabled: boolean;

    protected constructor(data: {
        id: string;
        label: any;
        value: any;
        checked: boolean;
        disabled: boolean;
        indeterminate: boolean;
    }) {
        this._id = data.id;
        this._label = data.label;
        this._value = data.value;
        this._checked = data.checked;
        this._indeterminate = data.indeterminate;
        this._disabled = data.disabled;
    }

    static create(data: CheckboxItemDto): CheckboxItem {
        return new CheckboxItem({
            id: generateId(data.id),
            label: data.label,
            value: data.value,
            checked: Boolean(data.checked),
            indeterminate: data.indeterminate ?? false,
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

    get indeterminate() {
        return this._indeterminate;
    }

    get disabled() {
        return this._disabled;
    }
}
