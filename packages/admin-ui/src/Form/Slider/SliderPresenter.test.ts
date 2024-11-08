import { FormSliderPresenter } from "./SliderPresenter";
import { SliderPresenter } from "~/Slider";

describe("FormSliderPresenter", () => {
    const onValueChange = jest.fn();

    it("should return the compatible `labelVm` based on props", () => {
        {
            // `label`
            const presenter = new SliderPresenter();
            const formSliderPresenter = new FormSliderPresenter(presenter);
            formSliderPresenter.init({ label: "Label", onValueChange });
            expect(formSliderPresenter.vm.labelVm.label).toEqual("Label");
        }

        {
            // `value`
            const presenter = new SliderPresenter();
            const formSliderPresenter = new FormSliderPresenter(presenter);
            formSliderPresenter.init({ label: "Label", onValueChange, value: 20 });
            expect(formSliderPresenter.vm.labelVm.value).toEqual("20");
        }

        {
            // `min`
            const presenter = new SliderPresenter();
            const formSliderPresenter = new FormSliderPresenter(presenter);
            formSliderPresenter.init({ label: "Label", onValueChange, min: 30 });
            expect(formSliderPresenter.vm.labelVm.value).toEqual("30");
        }

        {
            // `labelPosition`
            const presenter = new SliderPresenter();
            const formSliderPresenter = new FormSliderPresenter(presenter);
            formSliderPresenter.init({ label: "Label", onValueChange, labelPosition: "top" });
            expect(formSliderPresenter.vm.labelVm.position).toEqual("top");
        }

        {
            // default
            const presenter = new SliderPresenter();
            const formSliderPresenter = new FormSliderPresenter(presenter);
            formSliderPresenter.init({ label: "Label", onValueChange });
            expect(formSliderPresenter.vm.labelVm.label).toEqual("Label");
            expect(formSliderPresenter.vm.labelVm.value).toEqual("0");
            expect(formSliderPresenter.vm.labelVm.position).toEqual("top");
        }
    });

    it("should use default `value` (0) if `value` and `min` are both undefined", () => {
        const presenter = new SliderPresenter();
        const formSliderPresenter = new FormSliderPresenter(presenter);
        formSliderPresenter.init({ label: "Label", onValueChange });
        expect(formSliderPresenter.vm.labelVm.value).toEqual("0"); // `min` should default to 0
    });

    it("should apply the `transformValue` function if provided", () => {
        const transformValue = (value: number) => `${value} units`;
        const presenter = new SliderPresenter();
        const formSliderPresenter = new FormSliderPresenter(presenter);
        formSliderPresenter.init({ label: "Label", value: 30, onValueChange, transformValue });
        expect(formSliderPresenter.vm.labelVm.value).toEqual("30 units");
    });

    it("should fall back to `value` as a string if `transformValue` is undefined", () => {
        const presenter = new SliderPresenter();
        const formSliderPresenter = new FormSliderPresenter(presenter);
        formSliderPresenter.init({ label: "Label", value: 45, onValueChange });
        expect(formSliderPresenter.vm.labelVm.value).toEqual("45");
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        const presenter = new SliderPresenter();
        const formSliderPresenter = new FormSliderPresenter(presenter);
        formSliderPresenter.init({ label: "Label", value: 20, onValueChange });
        formSliderPresenter.changeValue([40]);
        expect(onValueChange).toHaveBeenCalledWith(40);
    });

    it("should call `onValueCommit` callback when `commitValue` is called", () => {
        const onValueCommit = jest.fn();
        const presenter = new SliderPresenter();
        const formSliderPresenter = new FormSliderPresenter(presenter);
        formSliderPresenter.init({ label: "Label", value: 20, onValueChange, onValueCommit });
        formSliderPresenter.commitValue([40]);
        expect(onValueCommit).toHaveBeenCalledWith(40);
    });

    it("should handle negative values correctly", () => {
        const presenter = new SliderPresenter();
        const formSliderPresenter = new FormSliderPresenter(presenter);
        formSliderPresenter.init({ label: "Label", value: -10, onValueChange });
        expect(formSliderPresenter.vm.labelVm.value).toEqual("-10");
    });
});
