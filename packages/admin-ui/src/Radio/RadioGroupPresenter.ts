import { makeAutoObservable } from "mobx";
import { RadioGroupVm } from "./RadioGroup";
import { RadioItem } from "./RadioItem";
import { RadioItemFormatter } from "./RadioItemFormatter";
import { RadioItemParams } from "./RadioItemParams";

interface RadioGroupPresenterParams<TValue = string> {
    items: RadioItemParams[];
    onValueChange: (value: TValue) => void;
}

interface IRadioGroupPresenter<TValue = string> {
    vm: RadioGroupVm;
    init: (props: RadioGroupPresenterParams<TValue>) => void;
    changeValue: (value: TValue) => void;
}

class RadioGroupPresenter<TValue = string> implements IRadioGroupPresenter<TValue> {
    private params?: RadioGroupPresenterParams<TValue> = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public init = (params: RadioGroupPresenterParams<TValue>) => {
        this.params = params;
    };

    get vm() {
        return {
            items: this.getRadioItems().map(item => RadioItemFormatter.format(item))
        };
    }

    public changeValue = (value: TValue) => {
        this.params?.onValueChange(value);
    };

    private getRadioItems() {
        if (!this.params?.items) {
            return [];
        }

        return this.params.items.map(item => RadioItem.create(item));
    }
}

export { RadioGroupPresenter, type RadioGroupPresenterParams, type IRadioGroupPresenter };
