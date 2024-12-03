import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { RangeSliderPrimitiveProps } from "./RangeSliderPrimitive";
import { RangeSliderPresenter, RangeSliderPresenterParams } from "./RangeSliderPresenter";

export const useRangeSlider = (props: RangeSliderPrimitiveProps) => {
    const params: RangeSliderPresenterParams = useMemo(
        () => ({
            min: props.min,
            max: props.max,
            onValuesChange: props.onValuesChange,
            onValuesCommit: props.onValuesCommit,
            showTooltip: props.showTooltip,
            transformValue: props.transformValue,
            values: props.values
        }),
        [
            props.min,
            props.max,
            props.onValuesChange,
            props.onValuesCommit,
            props.showTooltip,
            props.transformValue,
            props.values
        ]
    );

    const presenter = useMemo(() => {
        const presenter = new RangeSliderPresenter();
        presenter.init(params);
        return presenter;
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(params);
    }, [params]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValues: presenter.changeValues, commitValues: presenter.commitValues };
};
