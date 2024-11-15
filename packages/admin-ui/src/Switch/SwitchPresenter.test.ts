import { SwitchPresenter } from "./SwitchPresenter";

describe("SwitchPresenter", () => {
    const onCheckedChange = jest.fn();

    it("should return the compatible `switchVm` based on props", () => {
        // `checked`
        {
            const presenter = new SwitchPresenter();
            presenter.init({ onCheckedChange, checked: true });
            expect(presenter.vm.switchVm.checked).toEqual(true);
        }

        // `disabled`
        {
            const presenter = new SwitchPresenter();
            presenter.init({ onCheckedChange, disabled: true });
            expect(presenter.vm.switchVm.disabled).toEqual(true);
        }

        {
            // default: no props
            const presenter = new SwitchPresenter();
            presenter.init({ onCheckedChange });
            expect(presenter.vm.switchVm.checked).toEqual(false);
            expect(presenter.vm.switchVm.disabled).toEqual(false);
        }
    });

    it("should call `onCheckedChange` callback when `changeValue` is called", () => {
        const presenter = new SwitchPresenter();
        presenter.init({ onCheckedChange });
        presenter.changeValue(true);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
});
