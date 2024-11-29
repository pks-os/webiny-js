import { RadioGroupPresenter } from "./RadioGroupPresenter";

describe("RadioGroupPresenter", () => {
    const onValueChange = jest.fn();

    it("should return the compatible `vm` based on props", () => {
        // `items`
        {
            const presenter = new RadioGroupPresenter();
            presenter.init({
                onValueChange,
                items: [
                    {
                        value: "value-1",
                        label: "Value 1"
                    },
                    {
                        value: "value-2",
                        label: "Value 2"
                    }
                ]
            });
            expect(presenter.vm.items).toEqual([
                {
                    id: expect.any(String),
                    value: "value-1",
                    label: "Value 1",
                    disabled: false
                },
                {
                    id: expect.any(String),
                    value: "value-2",
                    label: "Value 2",
                    disabled: false
                }
            ]);
        }
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        const presenter = new RadioGroupPresenter();
        presenter.init({
            onValueChange,
            items: [
                {
                    value: "value-1",
                    label: "Value 1"
                },
                {
                    value: "value-2",
                    label: "Value 2"
                }
            ]
        });
        presenter.changeValue("value-2");
        expect(onValueChange).toHaveBeenCalledWith("value-2");
    });
});
