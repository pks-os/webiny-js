import { RangeSliderPresenter } from "./RangeSliderPresenter";

describe("RangeSliderPresenter", () => {
    const onValuesChange = jest.fn();

    it("should return the compatible `sliderVm` based on props", () => {
        // `value`
        {
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, values: [10, 90] });
            expect(presenter.vm.sliderVm.values).toEqual([10, 90]);
        }

        // `min`
        {
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, min: 25 });
            expect(presenter.vm.sliderVm.min).toEqual(25);
        }

        // `max`
        {
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, max: 75 });
            expect(presenter.vm.sliderVm.max).toEqual(75);
        }

        // `disabled`
        {
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, disabled: true });
            expect(presenter.vm.sliderVm.disabled).toEqual(true);
        }

        // `step`
        {
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, step: 10 });
            expect(presenter.vm.sliderVm.step).toEqual(10);
        }

        // `minStepsBetweenThumbs`
        {
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, minStepsBetweenThumbs: 10 });
            expect(presenter.vm.sliderVm.minStepsBetweenThumbs).toEqual(10);
        }

        {
            // default: no props
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange });
            expect(presenter.vm.sliderVm.values).toEqual([0, 100]);
            expect(presenter.vm.sliderVm.min).toEqual(0); // `min` should default to 0
            expect(presenter.vm.sliderVm.max).toEqual(100); // `min` should default to 100
            expect(presenter.vm.sliderVm.disabled).toEqual(undefined);
            expect(presenter.vm.sliderVm.step).toEqual(undefined);
            expect(presenter.vm.sliderVm.minStepsBetweenThumbs).toEqual(undefined);
        }
    });

    it("should return the `thumbsVm` with appropriate values", () => {
        {
            // `value`
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, values: [30, 70] });
            expect(presenter.vm.thumbsVm.values).toEqual(["30", "70"]);
        }

        {
            // `min` and `max`
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, min: 20, max: 80 });
            expect(presenter.vm.thumbsVm.values).toEqual(["20", "80"]);
        }

        {
            // `showTooltip`
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, showTooltip: true });
            expect(presenter.vm.thumbsVm.showTooltip).toEqual(false);
        }

        {
            // `tooltipSide`
            const presenterTop = new RangeSliderPresenter();
            presenterTop.init({ onValuesChange, tooltipSide: "top" });
            expect(presenterTop.vm.thumbsVm.tooltipSide).toEqual("top");

            const presenterBottom = new RangeSliderPresenter();
            presenterBottom.init({ onValuesChange, tooltipSide: "bottom" });
            expect(presenterBottom.vm.thumbsVm.tooltipSide).toEqual("bottom");
        }

        {
            // default: no props
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange });
            expect(presenter.vm.thumbsVm.values).toEqual(["0", "100"]);
            expect(presenter.vm.thumbsVm.showTooltip).toEqual(false);
            expect(presenter.vm.thumbsVm.tooltipSide).toBeUndefined();
        }
    });

    it("should use default `min` and `max` if `value` is undefined", () => {
        const presenter = new RangeSliderPresenter();
        presenter.init({ onValuesChange });
        expect(presenter.vm.thumbsVm.values).toEqual(["0", "100"]); // Defaults to [min, max]
    });

    it("should apply `transformValues` function if provided", () => {
        const transformValues = (value: number) => `${value} units`;
        const presenter = new RangeSliderPresenter();
        presenter.init({ onValuesChange, values: [40, 60], transformValues });
        expect(presenter.vm.thumbsVm.values).toEqual(["40 units", "60 units"]);
    });

    it("should fall back to string representation if `transformValues` is undefined", () => {
        const presenter = new RangeSliderPresenter();
        presenter.init({ onValuesChange, values: [45, 75] });
        expect(presenter.vm.thumbsVm.values).toEqual(["45", "75"]);
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        const presenter = new RangeSliderPresenter();
        presenter.init({ onValuesChange, values: [10, 90] });
        presenter.changeValues([20, 80]);
        expect(onValuesChange).toHaveBeenCalledWith([20, 80]);
    });

    it("should correctly handle edge cases with negative values", () => {
        const presenter = new RangeSliderPresenter();
        presenter.init({ onValuesChange, values: [-10, 10] });
        presenter.changeValues([-20, 20]);
        expect(onValuesChange).toHaveBeenCalledWith([-20, 20]);
    });

    it("should toggle `showTooltip` based on actions", () => {
        const presenter = new RangeSliderPresenter();
        presenter.init({ onValuesChange, showTooltip: true });

        presenter.changeValues([10, 90]);
        expect(presenter.vm.thumbsVm.showTooltip).toBeTruthy();

        presenter.commitValues([10, 90]);
        expect(presenter.vm.thumbsVm.showTooltip).toBeFalsy();
    });
});
