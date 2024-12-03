import { makeAutoObservable } from "mobx";
import { SliderPrimitiveVm } from "./SliderPrimitive";

interface SliderPresenterParams {
    min?: number;
    onValueChange: (value: number) => void;
    onValueCommit?: (value: number) => void;
    showTooltip?: boolean;
    transformValue?: (value: number) => string;
    value?: number;
}

interface ISliderPresenter {
    get vm(): SliderPrimitiveVm;
    init: (params: SliderPresenterParams) => void;
    changeValue: (values: number[]) => void;
    commitValue: (values: number[]) => void;
}

class SliderPresenter implements ISliderPresenter {
    private params?: SliderPresenterParams = undefined;
    private showTooltip = false;

    constructor() {
        makeAutoObservable(this);
    }

    init(params: SliderPresenterParams) {
        this.params = params;
    }

    get vm() {
        return {
            value: this.value,
            min: this.min,
            textValue: this.transformToLabelValue(this.value?.[0] || this.min),
            showTooltip: this.showTooltip
        };
    }

    public changeValue = (values: number[]) => {
        const [newValue] = values;
        this.showTooltip = !!this.params?.showTooltip;
        this.params?.onValueChange(newValue);
    };

    public commitValue = (values: number[]) => {
        const [newValue] = values;
        this.showTooltip = false;
        this.params?.onValueCommit?.(newValue);
    };

    private get value() {
        return this.params?.value !== undefined ? [this.params.value] : undefined;
    }

    private get min() {
        return this.params?.min ?? 0;
    }

    private transformToLabelValue(value: number) {
        return this.params?.transformValue ? this.params.transformValue(value) : String(value);
    }
}

export { SliderPresenter, type ISliderPresenter, type SliderPresenterParams };
