import React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { Icon } from "~/Icon";
import { Button } from "~/Button";

interface AutoCompleteInputIconsProps {
    hasValue: boolean;
    onOpenChange: (open: boolean) => void;
    onResetValue: () => void;
}

export const AutoCompleteInputIcons = (props: AutoCompleteInputIconsProps) => {
    return (
        <div className={"flex items-center gap-sm"}>
            {props.hasValue && (
                <Button
                    size={"xs"}
                    variant={"secondary"}
                    icon={<Icon icon={<Close />} label="Clear" />}
                    onClick={event => {
                        event.stopPropagation();
                        props.onResetValue();
                    }}
                />
            )}
            <Icon
                className="h-md w-md"
                icon={<ChevronDown />}
                label={"Open list"}
                onClick={event => {
                    event.stopPropagation();
                    props.onOpenChange(true);
                }}
            />
        </div>
    );
};
