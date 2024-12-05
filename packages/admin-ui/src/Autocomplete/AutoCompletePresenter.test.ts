import { AutoCompletePresenter } from "./AutoCompletePresenter";

describe("AutoCompletePresenter", () => {
    const presenter = new AutoCompletePresenter();
    const onValueChange = jest.fn();

    it("should return the compatible `vm.inputVm` based on params", () => {
        // `placeholder`
        {
            presenter.init({ onValueChange, placeholder: "Custom placeholder" });
            expect(presenter.vm.inputVm.placeholder).toEqual("Custom placeholder");
        }

        // `value`
        {
            presenter.init({ onValueChange, value: "Custom value" });
            expect(presenter.vm.inputVm.hasValue).toEqual(true);
        }

        {
            // default: no props
            presenter.init({ onValueChange });
            expect(presenter.vm.inputVm.placeholder).toEqual("Start typing or select");
            expect(presenter.vm.inputVm.hasValue).toEqual(false);
        }
    });

    it("should return the compatible `vm.listVm` based on props", () => {
        // with `options` as string
        {
            presenter.init({ onValueChange, options: ["Option 1", "Option 2"] });
            expect(presenter.vm.listVm.options).toEqual([
                {
                    value: "Option 1",
                    label: "Option 1",
                    options: [],
                    disabled: false,
                    selected: false,
                    separator: false
                },
                {
                    value: "Option 2",
                    label: "Option 2",
                    options: [],
                    disabled: false,
                    selected: false,
                    separator: false
                }
            ]);
        }

        // with `options` as formatted options
        {
            presenter.init({
                onValueChange,
                options: [
                    {
                        value: "option-1",
                        label: "Option 1"
                    },
                    {
                        value: "option-2",
                        label: "Option 2",
                        options: [
                            {
                                value: "option-3",
                                label: "Option 3",
                                options: [{ value: "option-4", label: "Option 4" }]
                            }
                        ]
                    },
                    {
                        value: "option-5",
                        label: "Option 5",
                        disabled: true
                    },
                    {
                        value: "option-6",
                        label: "Option 6",
                        separator: true
                    }
                ]
            });
            expect(presenter.vm.listVm.options).toEqual([
                {
                    value: "option-1",
                    label: "Option 1",
                    options: [],
                    disabled: false,
                    selected: false,
                    separator: false
                },
                {
                    value: "option-2",
                    label: "Option 2",
                    options: [
                        {
                            value: "option-3",
                            label: "Option 3",
                            options: [
                                {
                                    value: "option-4",
                                    label: "Option 4",
                                    options: [],
                                    disabled: false,
                                    selected: false,
                                    separator: false
                                }
                            ],
                            disabled: false,
                            selected: false,
                            separator: false
                        }
                    ],
                    disabled: false,
                    selected: false,
                    separator: false
                },
                {
                    value: "option-5",
                    label: "Option 5",
                    options: [],
                    disabled: true,
                    selected: false,
                    separator: false
                },
                {
                    value: "option-6",
                    label: "Option 6",
                    options: [],
                    disabled: false,
                    selected: false,
                    separator: true
                }
            ]);
        }

        // with `options` and `value`
        {
            presenter.init({ onValueChange, options: ["Option 1", "Option 2"], value: "Option 1" });
            expect(presenter.vm.listVm.options).toEqual([
                {
                    value: "Option 1",
                    label: "Option 1",
                    options: [],
                    disabled: false,
                    selected: true,
                    separator: false
                },
                {
                    value: "Option 2",
                    label: "Option 2",
                    options: [],
                    disabled: false,
                    selected: false,
                    separator: false
                }
            ]);
        }
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        presenter.init({ onValueChange, value: "value" });
        presenter.changeValue("value-2");
        expect(onValueChange).toHaveBeenCalledWith("value-2");
    });

    it("should call `onValueChange` and `onValueReset` callbacks when `resetValue` is called", () => {
        const onValueReset = jest.fn();
        presenter.init({ onValueChange, onValueReset, value: "value" });
        presenter.resetValue();
        expect(onValueChange).toHaveBeenCalledWith("");
        expect(onValueReset).toHaveBeenCalled();
    });

    it("should change `listVm` when `setListOpenState` is called", () => {
        presenter.init({ onValueChange });
        presenter.toggleListOpenState(true);
        expect(presenter.vm.listVm.isOpen).toBe(true);
        presenter.toggleListOpenState(false);
        expect(presenter.vm.listVm.isOpen).toBe(false);
    });
});
