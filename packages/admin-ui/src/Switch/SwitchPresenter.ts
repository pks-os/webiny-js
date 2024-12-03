import { makeAutoObservable } from "mobx";
import { SwitchPrimitivVm } from "./SwitchPrimitive";
import { SwitchItem } from "~/Switch/SwitchItem";
import { SwitchItemDto } from "~/Switch/SwitchItemDto";
import { SwitchItemMapper } from "~/Switch/SwitchItemMapper";

type SwitchPresenterParams = SwitchItemDto & {
    onCheckedChange: (checked: boolean) => void;
};

interface ISwitchPresenter<TParams extends SwitchPresenterParams = SwitchPresenterParams> {
    vm: SwitchPrimitivVm;
    init: (params: TParams) => void;
    changeChecked: (checked: boolean) => void;
}

class SwitchPresenter implements ISwitchPresenter {
    private params?: SwitchPresenterParams = undefined;
    private item?: SwitchItem = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public init = (params: SwitchPresenterParams) => {
        this.params = params;
        this.item = SwitchItem.create({
            id: params.id,
            label: params.label,
            value: params.value,
            checked: params.checked,
            disabled: params.disabled
        });
    };

    get vm() {
        return {
            item: this.item ? SwitchItemMapper.toFormatted(this.item) : undefined
        };
    }

    public changeChecked = (checked: boolean) => {
        this.params?.onCheckedChange?.(checked);
    };
}

export { SwitchPresenter, type SwitchPresenterParams, type ISwitchPresenter };
