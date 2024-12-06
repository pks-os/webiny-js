import { AutoCompletePresenter } from "./AutoCompletePresenter";
import { AutoCompleteInputPresenter } from "~/AutoComplete/AutoCompleteInputPresenter";

describe("AutoCompletePresenter", () => {
    const inputPresenter = new AutoCompleteInputPresenter();
    const presenter = new AutoCompletePresenter(inputPresenter);
    const onValueChange = jest.fn();

    it("should return the compatible `vm.inputVm` based on params", () => {
        // `placeholder`
        {
            presenter.init({ onValueChange, placeholder: "Custom placeholder" });
            expect(presenter.vm.inputVm.placeholder).toEqual("Custom placeholder");
        }

        {
            // default: no params
            presenter.init({ onValueChange });
            expect(presenter.vm.inputVm.placeholder).toEqual("Start typing or select");
            expect(presenter.vm.inputVm.hasValue).toEqual(false);
        }
    });

    it("should return the compatible `vm.listVm` based on params", () => {
        // with `options` as string
        {
            presenter.init({ onValueChange, options: ["Option 1", "Option 2"] });
            expect(presenter.vm.listVm.options).toEqual([
                {
                    value: "Option 1",
                    label: "Option 1",
                    disabled: false,
                    selected: false,
                    separator: false
                },
                {
                    value: "Option 2",
                    label: "Option 2",
                    disabled: false,
                    selected: false,
                    separator: false
                }
            ]);
            expect(presenter.vm.listVm.isEmpty).toEqual(false);
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
                        label: "Option 2"
                    },
                    {
                        value: "option-3",
                        label: "Option 3",
                        disabled: true
                    },
                    {
                        value: "option-4",
                        label: "Option 4",
                        separator: true
                    }
                ]
            });

            expect(presenter.vm.listVm.options).toEqual([
                {
                    value: "option-1",
                    label: "Option 1",
                    disabled: false,
                    selected: false,
                    separator: false
                },
                {
                    value: "option-2",
                    label: "Option 2",
                    disabled: false,
                    selected: false, // `selected` is overwritten by the presenter
                    separator: false
                },
                {
                    value: "option-3",
                    label: "Option 3",
                    disabled: true,
                    selected: false,
                    separator: false
                },
                {
                    value: "option-4",
                    label: "Option 4",
                    disabled: false,
                    selected: false,
                    separator: true
                }
            ]);
            expect(presenter.vm.listVm.isEmpty).toEqual(false);
        }

        // with `options` and `value`
        {
            presenter.init({ onValueChange, options: ["Option 1", "Option 2"], value: "Option 1" });
            expect(presenter.vm.listVm.options).toEqual([
                {
                    value: "Option 1",
                    label: "Option 1",
                    disabled: false,
                    selected: true,
                    separator: false
                },
                {
                    value: "Option 2",
                    label: "Option 2",
                    disabled: false,
                    selected: false,
                    separator: false
                }
            ]);
            expect(presenter.vm.listVm.isEmpty).toEqual(false);
        }

        {
            // default: no params
            presenter.init({ onValueChange });
            expect(presenter.vm.listVm.options).toEqual([]);
            expect(presenter.vm.listVm.emptyMessage).toEqual("No results.");
            expect(presenter.vm.listVm.isLoading).toEqual(false);
            expect(presenter.vm.listVm.isOpen).toEqual(false);
            expect(presenter.vm.listVm.isEmpty).toEqual(true);
        }
    });

    it("should change the `options` state and call `onValueChange` callback when `setSelectedOption` is called", () => {
        presenter.init({
            onValueChange,
            options: [
                {
                    label: "Option 1",
                    value: "option-1"
                },
                {
                    label: "Option 2",
                    value: "option-2"
                }
            ]
        });

        expect(presenter.vm.listVm.options).toEqual([
            {
                label: "Option 1",
                value: "option-1",
                disabled: false,
                selected: false,
                separator: false
            },
            {
                label: "Option 2",
                value: "option-2",
                disabled: false,
                selected: false,
                separator: false
            }
        ]);

        presenter.setSelectedOption("option-2");
        expect(onValueChange).toHaveBeenCalledWith("option-2");
        expect(presenter.vm.listVm.options).toEqual([
            {
                label: "Option 1",
                value: "option-1",
                disabled: false,
                selected: false,
                separator: false
            },
            {
                label: "Option 2",
                value: "option-2",
                disabled: false,
                selected: true,
                separator: false
            }
        ]);
    });

    it("should set the internal `inputValue` when `setInputValue` is called", () => {
        presenter.init({
            onValueChange
        });

        presenter.setInputValue("value");
        expect(presenter.vm.inputVm.value).toEqual("value");
        expect(presenter.vm.inputVm.hasValue).toEqual(true);
    });

    it("should set the option as `selected` when the presenter is initialized with a value", () => {
        presenter.init({
            onValueChange,
            value: "option-1",
            options: [
                {
                    label: "Option 1",
                    value: "option-1"
                },
                {
                    label: "Option 2",
                    value: "option-2"
                }
            ]
        });

        expect(presenter.vm.listVm.options).toEqual([
            {
                label: "Option 1",
                value: "option-1",
                disabled: false,
                selected: true,
                separator: false
            },
            {
                label: "Option 2",
                value: "option-2",
                disabled: false,
                selected: false,
                separator: false
            }
        ]);
        expect(presenter.vm.inputVm.value).toEqual("Option 1");
    });

    it("should reset the internal `options` state call `onValueChange` and `onValueReset` callbacks when `resetValue` is called", () => {
        const onValueReset = jest.fn();
        presenter.init({
            onValueChange,
            onValueReset,
            options: [
                {
                    label: "Option 1",
                    value: "option-1"
                },
                {
                    label: "Option 2",
                    value: "option-2"
                }
            ]
        });

        expect(presenter.vm.listVm.options).toEqual([
            {
                label: "Option 1",
                value: "option-1",
                disabled: false,
                selected: false,
                separator: false
            },
            {
                label: "Option 2",
                value: "option-2",
                disabled: false,
                selected: false,
                separator: false
            }
        ]);

        presenter.setSelectedOption("option-1");
        expect(presenter.vm.listVm.options).toEqual([
            {
                label: "Option 1",
                value: "option-1",
                disabled: false,
                selected: true,
                separator: false
            },
            {
                label: "Option 2",
                value: "option-2",
                disabled: false,
                selected: false,
                separator: false
            }
        ]);
        expect(presenter.vm.inputVm.value).toEqual("Option 1");

        presenter.resetValue();
        expect(presenter.vm.listVm.options).toEqual([
            {
                label: "Option 1",
                value: "option-1",
                disabled: false,
                selected: false,
                separator: false
            },
            {
                label: "Option 2",
                value: "option-2",
                disabled: false,
                selected: false,
                separator: false
            }
        ]);
        expect(presenter.vm.inputVm.value).toEqual("");

        expect(onValueChange).toHaveBeenCalledWith("");
        expect(onValueReset).toHaveBeenCalled();
    });

    it("should change `listVm` and call `onOpenChange` when `setListOpenState` is called", () => {
        const onOpenChange = jest.fn();

        // let's open it
        presenter.init({ onValueChange, onOpenChange });
        presenter.setListOpenState(true);
        expect(presenter.vm.listVm.isOpen).toBe(true);
        expect(onOpenChange).toHaveBeenCalledWith(true);

        // let's close it
        presenter.setListOpenState(false);
        expect(presenter.vm.listVm.isOpen).toBe(false);
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });
});
