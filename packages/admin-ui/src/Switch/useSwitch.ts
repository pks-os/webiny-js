import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { SwitchProps } from "./Switch";
import { SwitchPresenter } from "./SwitchPresenter";

export const useSwitch = (props: SwitchProps) => {
    const presenter = useMemo(() => new SwitchPresenter(), []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(props);
    }, [props]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValue: presenter.changeValue };
};
