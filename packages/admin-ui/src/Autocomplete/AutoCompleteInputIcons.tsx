import React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { Icon } from "~/Icon";

interface AutoCompleteInputIconsProps {
    hasValue: boolean;
    toggleListOpenState: (state: boolean) => void;
    resetValue: () => void;
}

export const AutoCompleteInputIcons = (props: AutoCompleteInputIconsProps) => {
    return (
        <div className={"flex items-center gap-sm"}>
            {props.hasValue && (
                <Icon
                    icon={<Close />}
                    label={"Clear"}
                    onClick={event => {
                        event.stopPropagation();
                        props.resetValue();
                    }}
                />
            )}
            <Icon
                icon={<ChevronDown />}
                label={"Open list"}
                onClick={event => {
                    event.stopPropagation();
                    props.toggleListOpenState(true);
                }}
            />
        </div>
    );
};
