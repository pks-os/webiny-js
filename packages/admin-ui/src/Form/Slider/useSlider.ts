import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { SliderProps } from "./Slider";
import { SliderPresenter } from "~/Slider";
import { FormSliderPresenter } from "./SliderPresenter";

export const useSlider = (props: SliderProps) => {
    const presenter = useMemo(() => {
        const sliderPresenter = new SliderPresenter();
        return new FormSliderPresenter(sliderPresenter);
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(props);
    }, [props]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValue: presenter.changeValue, commitValue: presenter.commitValue };
};
