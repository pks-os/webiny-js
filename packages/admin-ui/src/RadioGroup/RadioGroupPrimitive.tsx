import * as React from "react";
import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
import { cn, makeDecoratable } from "~/utils";
import { Radio } from "./Radio";
import { RadioItemParams } from "./RadioItemParams";
import { RadioItemFormatted } from "./RadioItemFormatted";
import { useRadioGroup } from "./useRadioGroup";

/**
 * Radio Group Root
 */
const DecoratableRadioGroupPrimitiveRoot = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitives.Root
            className={cn("grid gap-sm-extra", className)}
            {...props}
            ref={ref}
        />
    );
});
DecoratableRadioGroupPrimitiveRoot.displayName = RadioGroupPrimitives.Root.displayName;
const RadioGroupRoot = makeDecoratable(
    "RadioGroupPrimitiveRoot",
    DecoratableRadioGroupPrimitiveRoot
);

/**
 * Radio Group Renderer
 */
interface RadioGroupPrimitiveProps
    extends Omit<RadioGroupPrimitives.RadioGroupProps, "defaultValue" | "onValueChange"> {
    items: RadioItemParams[];
    onValueChange: (value: string) => void;
}

interface RadioGroupVm {
    items: RadioItemFormatted[];
}

interface RadioGroupRendererProps extends Omit<RadioGroupPrimitiveProps, "onValueChange"> {
    items: RadioItemFormatted[];
    changeValue: (value: string) => void;
}

const DecoratableRadioGroupRenderer = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitives.Root>,
    RadioGroupRendererProps
>(({ items, changeValue, ...props }, ref) => {
    return (
        <RadioGroupRoot {...props} ref={ref} onValueChange={value => changeValue(value)}>
            {items.map(item => (
                <Radio
                    id={item.id}
                    value={item.value}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled}
                />
            ))}
        </RadioGroupRoot>
    );
});
DecoratableRadioGroupRenderer.displayName = "DecoratableRadioGroupRenderer";
const RadioGroupRenderer = makeDecoratable("RadioGroupRenderer", DecoratableRadioGroupRenderer);

/**
 * Radio Group
 */
const DecoratableRadioGroupPrimitive = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitives.Root>,
    RadioGroupPrimitiveProps
>((props, ref) => {
    const { vm, changeValue } = useRadioGroup(props);
    return <RadioGroupRenderer {...props} items={vm.items} changeValue={changeValue} ref={ref} />;
});
DecoratableRadioGroupPrimitive.displayName = RadioGroupPrimitives.Root.displayName;
const RadioGroupPrimitive = makeDecoratable("RadioGroupPrimitive", DecoratableRadioGroupPrimitive);

/**
 * @deprecated
 * This component is retained in @webiny/admin-ui and used in  @webiny/ui solely as a compatibility layer.
 * It is marked as deprecated because nesting `Radio` components inside `RadioGroup` is no longer the recommended approach.
 * Instead, we now pass an array of `RadioItemDto` directly to `RadioGroup` for better maintainability.
 */
const DeprecatedRadioGroup = makeDecoratable("DeprecatedRadioGroup", RadioGroupRoot);

export {
    RadioGroupPrimitive,
    RadioGroupRenderer,
    DeprecatedRadioGroup,
    type RadioGroupPrimitiveProps,
    type RadioGroupVm
};
