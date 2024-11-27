import { makeAutoObservable } from "mobx";
import { CheckboxVm } from "./Checkbox";
import { CheckboxItem } from "./CheckboxItem";
import { CheckboxItemMapper } from "./CheckboxItemMapper";
import { CheckboxItemDto } from "~/Checkbox/CheckboxItemDto";

type CheckboxPresenterParams = CheckboxItemDto & {
    onCheckedChange: (checked: boolean) => void;
};

interface ICheckboxPresenter<TParams extends CheckboxPresenterParams = CheckboxPresenterParams> {
    vm: CheckboxVm;
    init: (params: TParams) => void;
    changeChecked: (checked: boolean) => void;
}

class CheckboxPresenter implements ICheckboxPresenter {
    private params?: CheckboxPresenterParams = undefined;
    private item?: CheckboxItem = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public init = (params: CheckboxPresenterParams) => {
        this.params = params;
        this.item = CheckboxItem.create({
            id: params.id,
            label: params.label,
            value: params.value,
            checked: params.checked,
            indeterminate: params.indeterminate,
            disabled: params.disabled
        });
    };

    get vm() {
        return {
            item: this.item ? CheckboxItemMapper.toFormatted(this.item) : undefined
        };
    }

    public changeChecked = (checked: boolean) => {
        this.params?.onCheckedChange(checked);
    };
}

export { CheckboxPresenter, type CheckboxPresenterParams, type ICheckboxPresenter };
