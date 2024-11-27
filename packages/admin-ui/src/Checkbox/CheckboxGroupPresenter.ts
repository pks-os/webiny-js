import { makeAutoObservable } from "mobx";
import { CheckboxGroupVm } from "./CheckboxGroup";
import { CheckboxItem } from "./CheckboxItem";
import { CheckboxItemMapper } from "./CheckboxItemMapper";
import { CheckboxItemDto } from "./CheckboxItemDto";

interface CheckboxGroupPresenterParams<TValue = string | number> {
    items: CheckboxItemDto[];
    values: TValue[];
    onCheckedChange: (values: TValue[]) => void;
}

interface ICheckboxGroupPresenter<TValue = string | number> {
    vm: CheckboxGroupVm;
    init: (params: CheckboxGroupPresenterParams<TValue>) => void;
    changeChecked: (value: TValue) => void;
}

class CheckboxGroupPresenter<TValue = string | number> implements ICheckboxGroupPresenter<TValue> {
    private params?: CheckboxGroupPresenterParams<TValue> = undefined;
    private items: CheckboxItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public init(params: CheckboxGroupPresenterParams<TValue>): void {
        this.params = params;
        this.items = this.getItems(params.items, params.values);
    }

    get vm(): CheckboxGroupVm {
        return {
            items: this.items.map(item => CheckboxItemMapper.toFormatted(item))
        };
    }

    public changeChecked = (value: TValue) => {
        if (!this.params?.items) {
            return;
        }

        const currentValues = [...this.params.values];
        const newValues = this.getUpdatedValues(currentValues, value);
        this.items = this.getItems(this.params.items, newValues);
        this.params.onCheckedChange(newValues);
    };

    private getUpdatedValues(currentValues: TValue[], value: TValue): TValue[] {
        const index = currentValues.indexOf(value);

        if (index > -1) {
            return [...currentValues.slice(0, index), ...currentValues.slice(index + 1)];
        }

        return [...currentValues, value];
    }

    private getItems(items: CheckboxItemDto[], values: TValue[]): CheckboxItem[] {
        if (!items.length) {
            return [];
        }

        return items.map(item =>
            CheckboxItem.create({
                ...item,
                checked: values.some(value => value === item.value)
            })
        );
    }
}

export { CheckboxGroupPresenter, type ICheckboxGroupPresenter, type CheckboxGroupPresenterParams };
