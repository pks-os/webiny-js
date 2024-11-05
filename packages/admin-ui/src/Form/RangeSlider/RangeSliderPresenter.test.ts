import { FormRangeSliderPresenter } from "./RangeSliderPresenter";
import { RangeSliderPresenter } from "~/RangeSlider";

describe("FormRangeSliderPresenter", () => {
    const onValuesChange = jest.fn();

    it("should return the compatible `labelVm` based on props", () => {
        {
            // `label`
            const presenter = new RangeSliderPresenter();
            const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
            formRangeSliderPresenter.init({ label: "Label", onValuesChange });
            expect(formRangeSliderPresenter.vm.labelVm.label).toEqual("Label");
        }

        {
            // `values`
            const presenter = new RangeSliderPresenter();
            const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
            formRangeSliderPresenter.init({ label: "Label", onValuesChange, values: [25, 75] });
            expect(formRangeSliderPresenter.vm.labelVm.values).toEqual(["25", "75"]);
        }

        {
            // `min` & `max`
            const presenter = new RangeSliderPresenter();
            const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
            formRangeSliderPresenter.init({ label: "Label", onValuesChange, min: 25, max: 75 });
            expect(formRangeSliderPresenter.vm.labelVm.values).toEqual(["25", "75"]);
        }

        {
            // default
            const presenter = new RangeSliderPresenter();
            const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
            formRangeSliderPresenter.init({ label: "Label", onValuesChange });
            expect(formRangeSliderPresenter.vm.labelVm.values).toEqual(["0", "100"]);
        }
    });

    it("should apply the `transformValues` function if provided", () => {
        const transformValues = (value: number) => `${value} units`;
        const presenter = new RangeSliderPresenter();
        const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
        formRangeSliderPresenter.init({
            label: "Label",
            values: [25, 75],
            onValuesChange,
            transformValues
        });
        expect(formRangeSliderPresenter.vm.labelVm.values).toEqual(["25 units", "75 units"]);
    });

    it("should fall back to `value` as a string if `transformValue` is undefined", () => {
        const presenter = new RangeSliderPresenter();
        const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
        formRangeSliderPresenter.init({
            label: "Label",
            values: [45, 55],
            onValuesChange
        });
        expect(formRangeSliderPresenter.vm.labelVm.values).toEqual(["45", "55"]);
    });

    it("should call `onValuesChange` callback when `changeValues` is called", () => {
        const presenter = new RangeSliderPresenter();
        const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
        formRangeSliderPresenter.init({ label: "Label", values: [20, 80], onValuesChange });
        formRangeSliderPresenter.changeValues([10, 90]);
        expect(onValuesChange).toHaveBeenCalledWith([10, 90]);
    });

    it("should call `onValuesCommit` callback when `commitValues` is called", () => {
        const onValuesCommit = jest.fn();
        const presenter = new RangeSliderPresenter();
        const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
        formRangeSliderPresenter.init({
            label: "Label",
            values: [20, 80],
            onValuesChange,
            onValuesCommit
        });
        formRangeSliderPresenter.commitValues([10, 90]);
        expect(onValuesCommit).toHaveBeenCalledWith([10, 90]);
    });

    it("should handle negative values correctly", () => {
        const presenter = new RangeSliderPresenter();
        const formRangeSliderPresenter = new FormRangeSliderPresenter(presenter);
        formRangeSliderPresenter.init({ label: "Label", values: [-10, 10], onValuesChange });
        expect(formRangeSliderPresenter.vm.labelVm.values).toEqual(["-10", "10"]);
    });
});
