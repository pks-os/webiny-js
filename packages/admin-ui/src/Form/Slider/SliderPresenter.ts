import { makeAutoObservable } from "mobx";
import omit from "lodash/omit";
import { ISliderPresenter } from "~/Slider";
import { SliderLabelVm, SliderProps } from "./Slider";

interface IFormSliderPresenter<TProps extends SliderProps = SliderProps>
    extends ISliderPresenter<TProps> {
    get vm(): ISliderPresenter<TProps>["vm"] & { labelVm: SliderLabelVm };
}

class FormSliderPresenter implements IFormSliderPresenter {
    private sliderPresenter: ISliderPresenter;
    private props?: SliderProps;

    constructor(sliderPresenter: ISliderPresenter) {
        this.sliderPresenter = sliderPresenter;
        this.props = undefined;
        makeAutoObservable(this);
    }

    init(props: SliderProps) {
        this.props = props;
        this.sliderPresenter.init(omit(props, ["label", "labelPosition"]));
    }

    get vm() {
        return {
            sliderVm: {
                ...this.sliderPresenter.vm.sliderVm
            },
            thumbVm: {
                ...this.sliderPresenter.vm.thumbVm
            },
            labelVm: {
                label: this.props?.label ?? "",
                position: this.props?.labelPosition ?? "top",
                value: this.transformToLabelValue(
                    this.sliderPresenter.vm.sliderVm.value?.[0] ??
                        this.sliderPresenter.vm.sliderVm.min
                )
            }
        };
    }

    public changeValue = (values: number[]): void => {
        this.sliderPresenter.changeValue(values);
    };

    public commitValue = (values: number[]): void => {
        this.sliderPresenter.commitValue(values);
    };

    private transformToLabelValue(value: number): string {
        return this.props?.transformValue ? this.props.transformValue(value) : String(value);
    }
}

export { FormSliderPresenter };
