import { makeAutoObservable } from "mobx";
import omit from "lodash/omit";
import { SwitchProps, SwitchVm } from "./Switch";

interface ISwitchPresenter<TProps extends SwitchProps = SwitchProps> {
    get vm(): {
        switchVm: SwitchVm;
    };
    init: (props: TProps) => void;
    changeValue: (checked: boolean) => void;
}

class SwitchPresenter implements ISwitchPresenter {
    private props?: SwitchProps;

    constructor() {
        this.props = undefined;
        makeAutoObservable(this);
    }

    init(props: SwitchProps) {
        this.props = props;
    }

    get vm() {
        return {
            switchVm: {
                ...omit(this.props, ["onCheckedChange"]),
                checked: this.props?.checked ?? false,
                disabled: this.props?.disabled ?? false
            }
        };
    }

    public changeValue = (checked: boolean) => {
        this.props?.onCheckedChange?.(checked);
    };
}

export { SwitchPresenter, type ISwitchPresenter };
