import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { CommandPresenter, CommandPresenterParams } from "./CommandPresenter";
import { CommandProps } from "./Command";

export const useCommand = (props: CommandProps) => {
    const params: CommandPresenterParams = useMemo(
        () => ({
            options: props.options,
            value: props.value,
            placeholder: props.placeholder,
            onValueChange: props.onValueChange,
            onValueReset: props.onValueReset
        }),
        [props.options, props.value, props.placeholder, props.onValueChange, props.onValueReset]
    );

    const presenter = useMemo(() => {
        const presenter = new CommandPresenter();
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
        changeValue: presenter.changeValue,
        resetValue: presenter.resetValue
    };
};
