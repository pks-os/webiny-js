import { RangeSliderPresenter } from "./RangeSliderPresenter";

describe("RangeSliderPresenter", () => {
    const onValuesChange = jest.fn();
    const presenter = new RangeSliderPresenter();

    it("should return the compatible `vm` based on params", () => {
        // `value`
        {
            presenter.init({ onValuesChange, values: [10, 90] });
            expect(presenter.vm.values).toEqual([10, 90]);
            expect(presenter.vm.textValues).toEqual(["10", "90"]);
        }

        {
            // `min` and `max`
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, min: 20, max: 80 });
            expect(presenter.vm.min).toEqual(20);
            expect(presenter.vm.max).toEqual(80);
            expect(presenter.vm.textValues).toEqual(["20", "80"]);
        }

        // `min`
        {
            presenter.init({ onValuesChange, min: 25 });
            expect(presenter.vm.min).toEqual(25);
        }

        // `max`
        {
            presenter.init({ onValuesChange, max: 75 });
            expect(presenter.vm.max).toEqual(75);
        }

        {
            // `showTooltip`
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange, showTooltip: true });
            expect(presenter.vm.showTooltip).toEqual(false);
        }

        {
            // default: no params
            const presenter = new RangeSliderPresenter();
            presenter.init({ onValuesChange });
            expect(presenter.vm.values).toEqual([0, 100]);
            expect(presenter.vm.textValues).toEqual(["0", "100"]);
            expect(presenter.vm.min).toEqual(0); // `min` should default to 0
            expect(presenter.vm.max).toEqual(100); // `min` should default to 100
            expect(presenter.vm.showTooltip).toEqual(false);
        }
    });

    it("should apply `transformValue` function if provided", () => {
        const transformValue = (value: number) => `${value} units`;
        presenter.init({ onValuesChange, values: [40, 60], transformValue });
        expect(presenter.vm.textValues).toEqual(["40 units", "60 units"]);
    });

    it("should fall back to string representation if `transformValue` is undefined", () => {
        presenter.init({ onValuesChange, values: [45, 75] });
        expect(presenter.vm.textValues).toEqual(["45", "75"]);
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        presenter.init({ onValuesChange, values: [10, 90] });
        presenter.changeValues([20, 80]);
        expect(onValuesChange).toHaveBeenCalledWith([20, 80]);
    });

    it("should correctly handle edge cases with negative values", () => {
        presenter.init({ onValuesChange, values: [-10, 10] });
        presenter.changeValues([-20, 20]);
        expect(onValuesChange).toHaveBeenCalledWith([-20, 20]);
    });

    it("should toggle `showTooltip` based on actions", () => {
        presenter.init({ onValuesChange, showTooltip: true });

        presenter.changeValues([10, 90]);
        expect(presenter.vm.showTooltip).toBeTruthy();

        presenter.commitValues([10, 90]);
        expect(presenter.vm.showTooltip).toBeFalsy();
    });
});
