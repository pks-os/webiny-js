import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { CheckboxItemDto, CheckboxItemFormatted, CheckboxPrimitiveRenderer } from "~/Checkbox";
import { useCheckboxGroup } from "./useCheckboxGroup";

type CheckboxGroupPrimitiveProps<TValue = any> = {
    items: CheckboxItemDto[];
    onCheckedChange: (values: TValue[]) => void;
    values: TValue[];
};

type CheckboxGroupPrimitiveVm = {
    items: CheckboxItemFormatted[];
};

type CheckboxGroupPrimitiveRendererProps<TValue = any> = CheckboxGroupPrimitiveVm & {
    changeChecked: (value: TValue) => void;
};

/**
 * Checkbox Group Renderer
 */
const DecoratableCheckboxGroupPrimitiveRenderer = ({
    items,
    changeChecked
}: CheckboxGroupPrimitiveRendererProps) => {
    return (
        <div className={cn("grid gap-sm-extra")}>
            {items.map(item => (
                <CheckboxPrimitiveRenderer
                    key={item.id}
                    {...item}
                    changeChecked={() => changeChecked(item.value)}
                />
            ))}
        </div>
    );
};
const CheckboxGroupPrimitiveRenderer = makeDecoratable(
    "CheckboxGroupPrimitiveRenderer",
    DecoratableCheckboxGroupPrimitiveRenderer
);

/**
 * Checkbox Group
 */
const DecoratableCheckboxGroupPrimitive = (props: CheckboxGroupPrimitiveProps) => {
    const { vm, changeChecked } = useCheckboxGroup(props);
    return <CheckboxGroupPrimitiveRenderer {...vm} changeChecked={changeChecked} />;
};
const CheckboxGroupPrimitive = makeDecoratable(
    "CheckboxGroupPrimitive",
    DecoratableCheckboxGroupPrimitive
);

export {
    CheckboxGroupPrimitive,
    CheckboxGroupPrimitiveRenderer,
    type CheckboxGroupPrimitiveProps,
    type CheckboxGroupPrimitiveRendererProps,
    type CheckboxGroupPrimitiveVm
};
