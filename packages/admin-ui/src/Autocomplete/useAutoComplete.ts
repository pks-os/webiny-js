import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { AutoCompletePresenter, AutoCompletePresenterParams } from "./AutoCompletePresenter";
import { AutoCompletePrimitiveProps } from "./AutoCompletePrimitive";
import { AutoCompleteInputPresenter } from "~/Autocomplete/AutoCompleteInputPresenter";

export const useAutoComplete = (props: AutoCompletePrimitiveProps & { inputValue?: string }) => {
    const params: AutoCompletePresenterParams = useMemo(
        () => ({
            options: props.options,
            value: props.value,
            placeholder: props.placeholder,
            emptyMessage: props.emptyMessage,
            onValueChange: props.onValueChange,
            onValueReset: props.onValueReset
        }),
        [
            props.options,
            props.value,
            props.placeholder,
            props.emptyMessage,
            props.onValueChange,
            props.onValueReset
        ]
    );

    const presenter = useMemo(() => {
        const inputPresenter = new AutoCompleteInputPresenter();
        const presenter = new AutoCompletePresenter(inputPresenter);
        presenter.init(params);
        return presenter;
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(params);
    }, [params, presenter]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return {
        vm,
        setSelectedOption: presenter.setSelectedOption,
        setInputValue: presenter.setInputValue,
        resetValue: presenter.resetValue,
        toggleListOpenState: presenter.toggleListOpenState
    };
};
