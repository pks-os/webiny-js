import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { CheckboxRenderer } from "./Checkbox";
import { CheckboxItemDto } from "./CheckboxItemDto";
import { CheckboxItemFormatted } from "./CheckboxItemFormatted";
import { useCheckboxGroup } from "~/Checkbox/useCheckboxGroup";

type CheckboxGroupProps<TValue = any> = {
    items: CheckboxItemDto[];
    onCheckedChange: (values: TValue[]) => void;
    values: TValue[];
};

type CheckboxGroupVm = {
    items: CheckboxItemFormatted[];
};

type CheckboxGroupRendererProps<TValue = any> = CheckboxGroupVm & {
    changeChecked: (value: TValue) => void;
};

/**
 * Checkbox Group Renderer
 */
const DecoratableCheckboxGroupRenderer = ({ items, changeChecked }: CheckboxGroupRendererProps) => {
    return (
        <div className={cn("grid gap-sm-extra")}>
            {items.map(item => (
                <CheckboxRenderer
                    key={item.id}
                    {...item}
                    changeChecked={() => changeChecked(item.value)}
                />
            ))}
        </div>
    );
};
const CheckboxGroupRenderer = makeDecoratable(
    "CheckboxGroupRenderer",
    DecoratableCheckboxGroupRenderer
);

/**
 * Checkbox Group
 */
const DecoratableCheckboxGroup = (props: CheckboxGroupProps) => {
    const { vm, changeChecked } = useCheckboxGroup(props);
    return <CheckboxGroupRenderer {...vm} changeChecked={changeChecked} />;
};
const CheckboxGroup = makeDecoratable("CheckboxGroup", DecoratableCheckboxGroup);

export {
    CheckboxGroup,
    CheckboxGroupRenderer,
    type CheckboxGroupProps,
    type CheckboxGroupRendererProps,
    type CheckboxGroupVm
};
