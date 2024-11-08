import { SliderPresenter } from "./SliderPresenter";

describe("SliderPresenter", () => {
    const onValueChange = jest.fn();

    it("should return the compatible `sliderVm` based on props", () => {
        // `value`
        {
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, value: 50 });
            expect(presenter.vm.sliderVm.value).toEqual([50]);
        }

        // `min`
        {
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, min: 25 });
            expect(presenter.vm.sliderVm.min).toEqual(25);
        }

        // `max`
        {
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, max: 75 });
            expect(presenter.vm.sliderVm.max).toEqual(75);
        }

        // `disabled`
        {
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, disabled: true });
            expect(presenter.vm.sliderVm.disabled).toEqual(true);
        }

        // `step`
        {
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, step: 10 });
            expect(presenter.vm.sliderVm.step).toEqual(10);
        }

        // `minStepsBetweenThumbs`
        {
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, minStepsBetweenThumbs: 10 });
            expect(presenter.vm.sliderVm.minStepsBetweenThumbs).toEqual(10);
        }

        {
            // default: no props
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange });
            expect(presenter.vm.sliderVm.value).toEqual(undefined);
            expect(presenter.vm.sliderVm.min).toEqual(0); // `min` should default to 0
            expect(presenter.vm.sliderVm.max).toEqual(undefined);
            expect(presenter.vm.sliderVm.disabled).toEqual(undefined);
            expect(presenter.vm.sliderVm.step).toEqual(undefined);
            expect(presenter.vm.sliderVm.minStepsBetweenThumbs).toEqual(undefined);
        }
    });

    it("should return the compatible `thumbVm` based on props", () => {
        {
            // `value`
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, value: 50 });
            expect(presenter.vm.thumbVm.value).toEqual("50");
        }

        {
            // `min`
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, min: 50 });
            expect(presenter.vm.thumbVm.value).toEqual(undefined);
        }

        {
            // `showTooltip`
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange, showTooltip: true });
            expect(presenter.vm.thumbVm.showTooltip).toEqual(false);
        }

        {
            // `tooltipSide`
            const presenterTop = new SliderPresenter();
            presenterTop.init({ onValueChange, tooltipSide: "top" });
            expect(presenterTop.vm.thumbVm.tooltipSide).toEqual("top");

            const presenterBottom = new SliderPresenter();
            presenterBottom.init({ onValueChange, tooltipSide: "bottom" });
            expect(presenterBottom.vm.thumbVm.tooltipSide).toEqual("bottom");
        }

        {
            // default: no props
            const presenter = new SliderPresenter();
            presenter.init({ onValueChange });
            expect(presenter.vm.thumbVm.value).toEqual(undefined);
            expect(presenter.vm.thumbVm.showTooltip).toEqual(false);
            expect(presenter.vm.thumbVm.tooltipSide).toBeUndefined();
        }
    });

    it("should use default `min` if `value` and `defaultValue` are both undefined", () => {
        const presenter = new SliderPresenter();
        presenter.init({ onValueChange });
        expect(presenter.vm.thumbVm.value).toEqual(undefined); // `min` should default to 0
    });

    it("should apply `transformValue` function if provided", () => {
        const transformValue = (value: number) => `${value} units`;
        const presenter = new SliderPresenter();
        presenter.init({ onValueChange, value: 30, transformValue });
        expect(presenter.vm.thumbVm.value).toEqual("30 units");
    });

    it("should fall back to `value` as a string if `transformValue` is undefined", () => {
        const presenter = new SliderPresenter();
        presenter.init({ onValueChange, value: 45 });
        expect(presenter.vm.thumbVm.value).toEqual("45");
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        const presenter = new SliderPresenter();
        presenter.init({ onValueChange, value: 20 });
        presenter.changeValue([40]);
        expect(onValueChange).toHaveBeenCalledWith(40);
    });

    it("should call `onValueCommit` callback when `commitValue` is called", () => {
        const onValueCommit = jest.fn();
        const presenter = new SliderPresenter();
        presenter.init({ onValueChange, value: 20, onValueCommit });
        presenter.commitValue([40]);
        expect(onValueCommit).toHaveBeenCalledWith(40);
    });

    it("should handle negative values correctly", () => {
        const presenter = new SliderPresenter();
        presenter.init({ onValueChange, value: -10 });
        expect(presenter.vm.sliderVm.value).toEqual([-10]);
        expect(presenter.vm.thumbVm.value).toEqual("-10");
    });

    it("should toggle `showTooltip` based on actions", () => {
        const presenter = new SliderPresenter();
        presenter.init({ onValueChange, showTooltip: true });

        presenter.changeValue([30]);
        expect(presenter.vm.thumbVm.showTooltip).toBeTruthy();

        presenter.commitValue([30]);
        expect(presenter.vm.thumbVm.showTooltip).toBeFalsy();
    });
});
