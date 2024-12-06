import { CommandOptionDto } from "./CommandOptionDto";

export class CommandOption {
    private readonly _label: string;
    private readonly _value: string;
    private readonly _disabled: boolean;
    private readonly _separator: boolean;
    private readonly _item: any | null;
    private _selected: boolean;

    protected constructor(data: {
        label: string;
        value: string;
        disabled: boolean;
        selected: boolean;
        separator: boolean;
        item: any | null;
    }) {
        this._label = data.label;
        this._value = data.value;
        this._disabled = data.disabled;
        this._selected = data.selected;
        this._separator = data.separator;
        this._item = data.item;
    }

    static create(data: CommandOptionDto) {
        return new CommandOption({
            label: data.label,
            value: data.value,
            disabled: data.disabled ?? false,
            selected: false,
            separator: data.separator ?? false,
            item: data.item ?? null
        });
    }

    static createFromString(value: string) {
        return new CommandOption({
            label: value,
            value: value,
            disabled: false,
            selected: false,
            separator: false,
            item: null
        });
    }

    get label() {
        return this._label;
    }

    get value() {
        return this._value;
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

    get item() {
        return this._item;
    }
}
