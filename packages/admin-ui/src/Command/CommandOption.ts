import { CommandOptionDto } from "./CommandOptionDto";

export class CommandOption {
    private readonly _label: string;
    private readonly _value: string | null;
    private readonly _options: CommandOption[];
    private readonly _disabled: boolean;
    private _selected: boolean;
    private readonly _separator: boolean;

    protected constructor(data: {
        label: string;
        value: string | null;
        options: CommandOptionDto[];
        disabled: boolean;
        selected: boolean;
        separator: boolean;
    }) {
        this._label = data.label;
        this._value = data.value;
        this._options = data.options.map(option => CommandOption.create(option));
        this._disabled = data.disabled;
        this._selected = data.selected;
        this._separator = data.separator;
    }

    static create(data: CommandOptionDto) {
        return new CommandOption({
            label: data.label,
            value: data.value ?? null,
            options: data.options ?? [],
            disabled: data.disabled ?? false,
            selected: data.selected ?? false,
            separator: data.separator ?? false
        });
    }

    static createFromString(value: string) {
        return new CommandOption({
            label: value,
            value: value,
            options: [],
            disabled: false,
            selected: false,
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

    get selected() {
        return this._selected;
    }

    set selected(selected: boolean) {
        this._selected = selected;
    }

    get separator() {
        return this._separator;
    }
}
