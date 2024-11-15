import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn, makeDecoratable } from "~/utils";
import { useSwitch } from "~/Switch/useSwitch";

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

type SwitchVm = Omit<SwitchPrimitives.SwitchProps, "checked" | "disabled" | "onCheckedChange"> & {
    checked: boolean;
    disabled: boolean;
};

interface SwitchRendererProps {
    switchVm: SwitchVm;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}
const DecoratableSwitchRenderer = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchRendererProps
>(({ switchVm, onCheckedChange, className }, ref) => {
    return (
        <SwitchPrimitives.Root
            className={cn([
                "peer inline-flex h-4 w-[26px] shrink-0 cursor-pointer items-center rounded-xxl border-sm transition-colors",
                "border-transparent data-[state=checked]:bg-secondary-default data-[state=unchecked]:bg-neutral-strong",
                "focus-visible:outline-none focus-visible:border-success-default focus-visible:ring-lg focus-visible:ring-primary-dimmed",
                "disabled:cursor-not-allowed disabled:bg-neutral-muted disabled:data-[state=checked]:bg-neutral-muted",
                className
            ])}
            onCheckedChange={onCheckedChange}
            {...switchVm}
            ref={ref}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    "pointer-events-none block h-2.5 w-2.5 rounded-xxl bg-neutral-base shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5"
                )}
            />
        </SwitchPrimitives.Root>
    );
});
DecoratableSwitchRenderer.displayName = "SwitchRenderer";

const SwitchRenderer = makeDecoratable("SwitchRenderer", DecoratableSwitchRenderer);

const DecoratableSwitch = (props: SwitchProps) => {
    const { vm, changeValue } = useSwitch(props);

    return (
        <SwitchRenderer
            switchVm={vm.switchVm}
            onCheckedChange={changeValue}
            className={props.className}
        />
    );
};

const Switch = makeDecoratable("Switch", DecoratableSwitch);

export { Switch, type SwitchProps, type SwitchVm };
