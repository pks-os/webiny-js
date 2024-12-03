import { makeAutoObservable } from "mobx";
import { RangeSliderPrimitiveVm } from "./RangeSliderPrimitive";

interface RangeSliderPresenterParams {
    min?: number;
    max?: number;
    onValuesChange: (values: number[]) => void;
    onValuesCommit?: (values: number[]) => void;
    showTooltip?: boolean;
    transformValue?: (values: number) => string;
    values?: number[];
}

interface IRangeSliderPresenter {
    get vm(): RangeSliderPrimitiveVm;
    init: (params: RangeSliderPresenterParams) => void;
    changeValues: (values: number[]) => void;
    commitValues: (values: number[]) => void;
}

class RangeSliderPresenter implements IRangeSliderPresenter {
    private params?: RangeSliderPresenterParams = undefined;
    private showTooltip = false;

    constructor() {
        makeAutoObservable(this);
    }

    init(params: RangeSliderPresenterParams) {
        this.params = params;
    }

    get vm() {
        return {
            min: this.min,
            max: this.max,
            values: this.values,
            textValues: this.transformToLabelValues(this.values),
            showTooltip: this.showTooltip
        };
    }

    public changeValues = (values: number[]) => {
        this.showTooltip = !!this.params?.showTooltip;
        this.params?.onValuesChange?.(values);
    };

    public commitValues = (values: number[]) => {
        this.showTooltip = false;
        this.params?.onValuesCommit?.(values);
    };

    private get min() {
        return this.params?.min ?? 0;
    }

    private get max() {
        return this.params?.max ?? 100;
    }

    private get values() {
        return this.params?.values ?? [this.min, this.max];
    }

    private transformToLabelValues(values: number[]) {
        return values.map(value =>
            this.params?.transformValue ? this.params.transformValue(value) : String(value)
        );
    }
}

export { RangeSliderPresenter, type IRangeSliderPresenter, type RangeSliderPresenterParams };
