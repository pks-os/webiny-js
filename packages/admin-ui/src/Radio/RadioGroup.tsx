import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn, makeDecoratable } from "~/utils";
import { Radio } from "./Radio";
import { RadioItemParams } from "./RadioItemParams";
import { RadioItemFormatted } from "./RadioItemFormatted";
import { useRadioGroup } from "./useRadioGroup";

/**
 * Radio Group Root
 */
const DecoratableRadioGroupRoot = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-sm-extra", className)}
            {...props}
            ref={ref}
        />
    );
});
DecoratableRadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupRoot = makeDecoratable("RadioGroupRoot", DecoratableRadioGroupRoot);

/**
 * Radio Group Renderer
 */
interface RadioGroupProps
    extends Omit<RadioGroupPrimitive.RadioGroupProps, "defaultValue" | "onValueChange"> {
    items: RadioItemParams[];
    onValueChange: (value: string) => void;
}

interface RadioGroupVm {
    items: RadioItemFormatted[];
}

interface RadioGroupRendererProps extends Omit<RadioGroupProps, "onValueChange"> {
    items: RadioItemFormatted[];
    changeValue: (value: string) => void;
}

const DecoratableRadioGroupRenderer = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
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
const DecoratableRadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    RadioGroupProps
>((props, ref) => {
    const { vm, changeValue } = useRadioGroup(props);
    return <RadioGroupRenderer {...props} items={vm.items} changeValue={changeValue} ref={ref} />;
});
DecoratableRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

/**
 * @deprecated
 * This component is retained in @webiny/admin-ui and used in  @webiny/ui solely as a compatibility layer.
 * It is marked as deprecated because nesting `Radio` components inside `RadioGroup` is no longer the recommended approach.
 * Instead, we now pass an array of `RadioItemDto` directly to `RadioGroup` for better maintainability.
 */
const DeprecatedRadioGroup = makeDecoratable("DeprecatedRadioGroup", RadioGroupRoot);

export {
    RadioGroup,
    RadioGroupRenderer,
    DeprecatedRadioGroup,
    type RadioGroupProps,
    type RadioGroupVm
};
