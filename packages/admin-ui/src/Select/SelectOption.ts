import { SelectOptionDto } from "./SelectOptionDto";

export class SelectOption {
    private readonly _label: string;
    private readonly _value: string | null;
    private readonly _options: SelectOption[];
    private readonly _disabled: boolean;
    private readonly _separator: boolean;

    protected constructor(data: {
        label: string;
        value: string | null;
        options: SelectOptionDto[];
        disabled: boolean;
        separator: boolean;
    }) {
        this._label = data.label;
        this._value = data.value;
        this._options = data.options.map(option => SelectOption.create(option));
        this._disabled = data.disabled;
        this._separator = data.separator;
    }

    static create(data: SelectOptionDto) {
        return new SelectOption({
            label: data.label,
            value: data.value ?? null,
            options: data.options ?? [],
            disabled: data.disabled ?? false,
            separator: data.separator ?? false
        });
    }

    static createFromString(value: string) {
        return new SelectOption({
            label: value,
            value: value,
            options: [],
            disabled: false,
            separator: false
        });
    }

    get label() {
        return this._label;
    }

    get value() {
        return this._value;
    }

    get options() {
        return this._options;
    }

    get disabled() {
        return this._disabled;
    }

    get separator() {
        return this._separator;
    }
}
