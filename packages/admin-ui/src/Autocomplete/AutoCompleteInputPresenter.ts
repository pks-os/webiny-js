import { makeAutoObservable } from "mobx";

interface AutoCompleteInputPresenterParams {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

interface IAutoCompleteInputPresenter {
    vm: {
        placeholder: string;
        value: string;
        hasValue: boolean;
    };
    init: (params: AutoCompleteInputPresenterParams) => void;
    setValue: (value?: string) => void;
}

class AutoCompleteInputPresenter implements IAutoCompleteInputPresenter {
    private value?: string = undefined;
    private placeholder?: string = undefined;
    private onChange?: (value: string) => void;

    constructor() {
        makeAutoObservable(this);
    }

    init(params?: AutoCompleteInputPresenterParams) {
        this.value = params?.value;
        this.placeholder = params?.placeholder;
        this.onChange = params?.onChange;
    }

    get vm() {
        return {
            placeholder: this.placeholder || "Start typing or select",
            value: this.value || "",
            hasValue: !!this.value
        };
    }

    public setValue = (value = "") => {
        this.value = value;
        this.onChange?.(value);
    };
}

export {
    AutoCompleteInputPresenter,
    type IAutoCompleteInputPresenter,
    type AutoCompleteInputPresenterParams
};
