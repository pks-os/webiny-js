import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { RangeSliderProps } from "./RangeSlider";
import { RangeSliderPresenter } from "./RangeSliderPresenter";

export const useRangeSlider = (props: RangeSliderProps) => {
    const presenter = useMemo(() => new RangeSliderPresenter(), []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(props);
    }, [props]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValues: presenter.changeValues, commitValues: presenter.commitValues };
};
