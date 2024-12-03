import * as React from "react";
import * as CheckboxPrimitives from "@radix-ui/react-checkbox";
import { ReactComponent as CheckIcon } from "@material-design-icons/svg/outlined/check.svg";
import { cn, makeDecoratable, cva, type VariantProps } from "~/utils";
import { useCheckbox } from "./useCheckbox";
import { CheckboxItemFormatted } from "./CheckboxItemFormatted";
import { CheckboxItemDto } from "./CheckboxItemDto";
import { Label } from "~/Label";

/**
 * Indeterminate Icon
 */
const IndeterminateIcon = () => {
    return (
        <span
            className={
                "block w-sm h-xxs rounded-sm bg-primary-default group-disabled:bg-primary-disabled"
            }
        />
    );
};

/**
 * Checkbox Renderer
 */
const checkboxVariants = cva(
    [
        "group peer h-md w-md shrink-0 rounded-sm border-sm mt-xxs",
        "border-neutral-muted bg-neutral-base fill-neutral-base ring-offset-background",
        "hover:border-neutral-dark",
        "focus:outline-none focus-visible:border-accent-default focus-visible:ring-lg focus-visible:ring-primary-dimmed focus-visible:ring-offset-0",
        "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-neutral-disabled",
        "data-[state=checked]:bg-primary-default data-[state=checked]:border-transparent",
        "data-[state=checked]:hover:bg-primary-strong",
        "data-[state=checked]:disabled:bg-neutral-disabled data-[state=checked]:disabled:fill-neutral-strong"
    ],
    {
        variants: {
            indeterminate: {
                true: [
                    "border-neutral-muted",
                    "data-[state=checked]:bg-neutral-base data-[state=checked]:border-neutral-muted",
                    "data-[state=checked]:hover:bg-neutral-base data-[state=checked]:hover:border-neutral-strong",
                    "data-[state=checked]:focus-visible:border-accent-default",
                    "data-[state=checked]:disabled:border-transparent"
                ]
            }
        }
    }
);

type CheckboxPrimitiveProps = Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitives.Root>,
    "defaultChecked" | "onCheckedChange"
> &
    VariantProps<typeof checkboxVariants> &
    CheckboxItemDto & {
        onCheckedChange: (checked: boolean) => void;
    };

interface CheckboxPrimitiveVm {
    item?: CheckboxItemFormatted;
}

type CheckboxPrimitiveRendererProps = Omit<CheckboxPrimitiveProps, "onCheckedChange"> &
    NonNullable<CheckboxPrimitiveVm["item"]> & {
        changeChecked: (checked: boolean) => void;
    };

const DecoratableCheckboxPrimitiveRenderer = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitives.Root>,
    CheckboxPrimitiveRendererProps
>(({ label, id, indeterminate, changeChecked, className, ...props }, ref) => {
    return (
        <div className="flex items-start space-x-sm-extra">
            <CheckboxPrimitives.Root
                ref={ref}
                {...props}
                id={id}
                className={cn(checkboxVariants({ indeterminate }), className)}
                onCheckedChange={changeChecked}
            >
                <span className={cn("flex items-center justify-center")}>
                    {indeterminate && <IndeterminateIcon />}
                    <CheckboxPrimitives.Indicator>
                        <CheckIcon className={"h-sm-extra w-sm-extra"} />
                    </CheckboxPrimitives.Indicator>
                </span>
            </CheckboxPrimitives.Root>
            <Label id={id} text={label} weight={"light"} className={"text-md"} />
        </div>
    );
});
DecoratableCheckboxPrimitiveRenderer.displayName = "CheckboxPrimitiveRenderer";
const CheckboxPrimitiveRenderer = makeDecoratable(
    "CheckboxPrimitiveRenderer",
    DecoratableCheckboxPrimitiveRenderer
);

/**
 * Checkbox
 */
const DecoratableCheckboxPrimitive = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitives.Root>,
    CheckboxPrimitiveProps
>((props, ref) => {
    const { vm, changeChecked } = useCheckbox(props);

    if (!vm.item) {
        return null;
    }

    return (
        <CheckboxPrimitiveRenderer
            {...props}
            {...vm.item}
            changeChecked={changeChecked}
            ref={ref}
        />
    );
});
DecoratableCheckboxPrimitive.displayName = CheckboxPrimitives.Root.displayName;
const CheckboxPrimitive = makeDecoratable("CheckboxPrimitive", DecoratableCheckboxPrimitive);

export {
    CheckboxPrimitive,
    CheckboxPrimitiveRenderer,
    type CheckboxPrimitiveProps,
    type CheckboxPrimitiveVm
};
