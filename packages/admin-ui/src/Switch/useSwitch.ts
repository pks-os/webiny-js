import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { SwitchPrimitiveProps } from "./SwitchPrimitive";
import { SwitchPresenter, SwitchPresenterParams } from "./SwitchPresenter";

export const useSwitch = (props: SwitchPrimitiveProps) => {
    const params: SwitchPresenterParams = useMemo(
        () => ({
            id: props.id,
            label: props.label,
            value: props.value,
            checked: props.checked,
            disabled: props.disabled,
            onCheckedChange: props.onCheckedChange
        }),
        [props.id, props.label, props.value, props.checked, props.disabled, props.onCheckedChange]
    );

    const presenter = useMemo(() => {
        const presenter = new SwitchPresenter();
        presenter.init(params);
        return presenter;
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(params);
    }, [params]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeChecked: presenter.changeChecked };
};
