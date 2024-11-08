import { makeAutoObservable } from "mobx";
import omit from "lodash/omit";
import { RangeSliderProps, RangeSliderThumbsVm, RangeSliderVm } from "./RangeSlider";

interface IRangeSliderPresenter<TProps extends RangeSliderProps = RangeSliderProps> {
    get vm(): {
        sliderVm: RangeSliderVm;
        thumbsVm: RangeSliderThumbsVm;
    };
    init: (props: TProps) => void;
    changeValues: (values: number[]) => void;
    commitValues: (values: number[]) => void;
}

class RangeSliderPresenter implements IRangeSliderPresenter {
    private props?: RangeSliderProps;
    private showTooltip: boolean;

    constructor() {
        this.props = undefined;
        this.showTooltip = false;
        makeAutoObservable(this);
    }

    init(props: RangeSliderProps) {
        this.props = props;
    }

    get vm() {
        return {
            sliderVm: {
                ...omit(this.props, [
                    "showTooltip",
                    "tooltipSide",
                    "transformValues",
                    "onValuesChange",
                    "onValuesCommit",
                    "values"
                ]),
                min: this.min,
                max: this.max,
                values: this.values
            },
            thumbsVm: {
                values: this.transformToLabelValues(this.values),
                showTooltip: this.showTooltip,
                tooltipSide: this.props?.tooltipSide
            }
        };
    }

    public changeValues = (values: number[]) => {
        this.showTooltip = !!this.props?.showTooltip;
        this.props?.onValuesChange?.(values);
    };

    public commitValues = (values: number[]) => {
        this.showTooltip = false;
        this.props?.onValuesCommit?.(values);
    };

    private get min() {
        return this.props?.min ?? 0;
    }

    private get max() {
        return this.props?.max ?? 100;
    }

    private get values() {
        return this.props?.values ?? [this.min, this.max];
    }

    private transformToLabelValues(values: number[]) {
        return values.map(value =>
            this.props?.transformValues ? this.props.transformValues(value) : String(value)
        );
    }
}

export { RangeSliderPresenter, type IRangeSliderPresenter };
