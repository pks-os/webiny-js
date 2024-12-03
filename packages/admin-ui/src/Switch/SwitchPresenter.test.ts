import { SwitchPresenter } from "./SwitchPresenter";

describe("SwitchPresenter", () => {
    const onCheckedChange = jest.fn();

    it("should return the compatible `switchVm` based on props", () => {
        const presenter = new SwitchPresenter();

        // `label`
        {
            presenter.init({ onCheckedChange, label: "Label" });
            expect(presenter.vm.item?.label).toEqual("Label");
        }

        // `checked`
        {
            presenter.init({ onCheckedChange, label: "Label", checked: true });
            expect(presenter.vm.item?.checked).toEqual(true);
        }

        // `disabled`
        {
            presenter.init({ onCheckedChange, label: "Label", disabled: true });
            expect(presenter.vm.item?.disabled).toEqual(true);
        }

        // default: only mandatory props
        {
            presenter.init({ onCheckedChange, label: "Label" });
            expect(presenter.vm.item).toEqual({
                id: expect.any(String),
                label: "Label",
                checked: false,
                disabled: false
            });
        }
    });

    it("should call `onCheckedChange` callback when `changeValue` is called", () => {
        const presenter = new SwitchPresenter();
        presenter.init({ onCheckedChange, label: "Label" });
        presenter.changeChecked(true);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
});
