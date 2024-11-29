import { CheckboxPresenter } from "./CheckboxPresenter";

describe("CheckboxPresenter", () => {
    const onCheckedChange = jest.fn();

    it("should return the compatible `vm` based on props", () => {
        const presenter = new CheckboxPresenter();

        // `label`
        {
            presenter.init({
                onCheckedChange,
                label: "Label"
            });
            expect(presenter.vm.item?.label).toEqual("Label");
        }

        // `id`
        {
            presenter.init({
                onCheckedChange,
                label: "Label",
                id: "id"
            });
            expect(presenter.vm.item?.id).toEqual("id");
        }

        // `checked`
        {
            presenter.init({
                onCheckedChange,
                label: "Label",
                checked: true
            });
            expect(presenter.vm.item?.checked).toBeTruthy();
        }

        // `indeterminate`
        {
            presenter.init({
                onCheckedChange,
                label: "Label",
                indeterminate: true
            });
            expect(presenter.vm.item?.indeterminate).toBeTruthy();
        }

        // `disabled`
        {
            presenter.init({
                onCheckedChange,
                label: "Label",
                disabled: true
            });
            expect(presenter.vm.item?.disabled).toBeTruthy();
        }

        // default: only mandatory props
        {
            presenter.init({
                onCheckedChange,
                label: "Label"
            });
            expect(presenter.vm.item).toEqual({
                id: expect.any(String),
                label: "Label",
                checked: false,
                indeterminate: false,
                disabled: false
            });
        }
    });

    it("should call `onCheckedChange` callback when `changeChecked` is called", () => {
        const presenter = new CheckboxPresenter();
        presenter.init({ onCheckedChange, label: "Label" });
        presenter.changeChecked(true);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
});
