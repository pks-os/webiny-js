import { makeAutoObservable } from "mobx";
import { IRangeSliderPresenter } from "~/RangeSlider";
import { RangeSliderLabelVm, RangeSliderProps } from "./RangeSlider";

interface IFormRangeSliderPresenter<TProps extends RangeSliderProps = RangeSliderProps>
    extends IRangeSliderPresenter<TProps> {
    get vm(): IRangeSliderPresenter<TProps>["vm"] & { labelVm: RangeSliderLabelVm };
}

class FormRangeSliderPresenter implements IFormRangeSliderPresenter {
    private rangeSliderPresenter: IRangeSliderPresenter;
    private props?: RangeSliderProps;

    constructor(rangeSliderPresenter: IRangeSliderPresenter) {
        this.rangeSliderPresenter = rangeSliderPresenter;
        this.props = undefined;
        makeAutoObservable(this);
    }

    init(props: RangeSliderProps) {
        this.props = props;
        this.rangeSliderPresenter.init(props);
    }

    get vm() {
        return {
            sliderVm: {
                ...this.rangeSliderPresenter.vm.sliderVm
            },
            thumbsVm: {
                ...this.rangeSliderPresenter.vm.thumbsVm
            },
            labelVm: {
                label: this.props?.label ?? "",
                values: this.transformToLabelValues(this.rangeSliderPresenter.vm.sliderVm.values)
            }
        };
    }

    public changeValues = (values: number[]): void => {
        this.rangeSliderPresenter.changeValues(values);
    };

    public commitValues = (values: number[]): void => {
        this.rangeSliderPresenter.commitValues(values);
    };

    private transformToLabelValues(values: number[]) {
        return values.map(value =>
            this.props?.transformValues ? this.props.transformValues(value) : String(value)
        );
    }
}

export { FormRangeSliderPresenter };
