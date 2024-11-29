import * as React from "react";
import { ReactComponent as ChevronUp } from "@material-design-icons/svg/outlined/keyboard_arrow_up.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { makeDecoratable } from "@webiny/react-composition";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils";
import { useSelect } from "./useSelect";
import { SelectOptionDto } from "./SelectOptionDto";
import { SelectOptionFormatted } from "./SelectOptionFormatted";

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

/**
 * Icon
 */
type IconWrapperProps = {
    icon: React.ReactElement;
};

const Icon = ({ icon }: IconWrapperProps) => {
    return (
        <SelectPrimitive.Icon asChild className={"h-4 w-4"}>
            {React.cloneElement(icon)}
        </SelectPrimitive.Icon>
    );
};

/**
 * Trigger
 */
const triggerVariants = cva(
    [
        "w-full flex items-center justify-between gap-sm border-sm text-md relative",
        "focus:outline-none",
        "disabled:cursor-not-allowed"
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-neutral-base border-neutral-muted text-neutral-strong placeholder:text-neutral-dimmed fill-neutral-xstrong",
                    "hover:border-neutral-strong",
                    "focus:border-neutral-black",
                    "disabled:bg-neutral-disabled disabled:border-neutral-dimmed disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled disabled:fill-neutral-disabled"
                ],
                secondary: [
                    "bg-neutral-light border-neutral-subtle text-neutral-strong placeholder:text-neutral-muted fill-neutral-xstrong",
                    "hover:bg-neutral-dimmed",
                    "focus:border-neutral-black focus:bg-neutral-base",
                    "disabled:bg-neutral-disabled disabled:border-neutral-dimmed disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled disabled:fill-neutral-disabled"
                ],
                ghost: [
                    "bg-neutral-base border-transparent text-neutral-strong placeholder:text-neutral-dimmed",
                    "hover:bg-neutral-light",
                    "focus:bg-neutral-light",
                    "disabled:bg-neutral-disabled disabled:border-neutral-dimmed disabled:text-neutral-disabled disabled:placeholder:text-neutral-disabled disabled:fill-neutral-disabled"
                ]
            },
            size: {
                md: [
                    "rounded-sm",
                    "py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                lg: [
                    "rounded-sm",
                    "py-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))] px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                xl: [
                    "rounded-md leading-6",
                    "py-[calc(theme(padding.md)-theme(borderWidth.sm))] px-[calc(theme(padding.md)-theme(borderWidth.sm))]"
                ]
            },
            invalid: {
                true: [
                    "border-destructive-default",
                    "hover:border-destructive-default",
                    "focus:border-destructive-default",
                    "disabled:border-destructive-default"
                ]
            }
        },
        compoundVariants: [
            // Add specific classNames in case of invalid variant.
            {
                variant: "secondary",
                invalid: true,
                class: [
                    "bg-neutral-base border-destructive-default",
                    "hover:bg-neutral-dimmed hover:border-destructive-default",
                    "focus:bg-neutral-base focus:border-destructive-default",
                    "disabled:bg-neutral-disabled disabled:border-destructive-default"
                ]
            },
            {
                variant: "ghost",
                invalid: true,
                class: [
                    "border-none bg-destructive-subtle",
                    "hover:bg-destructive-subtle",
                    "focus:bg-destructive-subtle",
                    "disabled:bg-destructive-subtle"
                ]
            }
        ],
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    }
);

interface TriggerProps
    extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
        VariantProps<typeof triggerVariants> {
    startIcon?: React.ReactElement;
    endIcon?: React.ReactElement;
    resetIcon?: React.ReactElement;
}

const DecoratableTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    TriggerProps
>(
    (
        {
            className,
            children,
            size,
            variant,
            startIcon,
            endIcon = <ChevronDown />,
            resetIcon,
            disabled,
            invalid,
            ...props
        },
        ref
    ) => (
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(triggerVariants({ variant, size, invalid, className }))}
            disabled={disabled}
            {...props}
        >
            {startIcon && <Icon icon={startIcon} />}
            {children}
            {resetIcon && <Icon icon={resetIcon} />}
            <Icon icon={endIcon} />
        </SelectPrimitive.Trigger>
    )
);
DecoratableTrigger.displayName = SelectPrimitive.Trigger.displayName;

const Trigger = makeDecoratable("Trigger", DecoratableTrigger);

/**
 * SelectScrollUpButton
 */
const DecoratableSelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center pb-sm fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
));
DecoratableSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollUpButton = makeDecoratable(
    "SelectScrollUpButton",
    DecoratableSelectScrollUpButton
);

/**
 * SelectScrollDownButton
 */
const DecoratableSelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center pt-sm fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
));
DecoratableSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectScrollDownButton = makeDecoratable(
    "SelectScrollDownButton",
    DecoratableSelectScrollDownButton
);

/**
 * SelectContent
 */
const selectContentVariants = cva([
    "relative z-50 max-h-96 min-w-56 shadow-lg py-sm overflow-hidden rounded-sm border-sm border-neutral-muted bg-neutral-base text-neutral-strong",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
]);

interface SelectContentProps
    extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
        VariantProps<typeof selectContentVariants> {}

const DecoratableSelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    SelectContentProps
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(selectContentVariants({ className }))}
            position={"popper"}
            {...props}
        >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
                className={cn([
                    "py-xs",
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                ])}
            >
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
));
DecoratableSelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectContent = makeDecoratable("SelectContent", DecoratableSelectContent);

/**
 * SelectLabel
 */
const DecoratableSelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn(
            ["py-sm px-md text-neutral-strong text-sm font-semibold uppercase"],
            className
        )}
        {...props}
    />
));
DecoratableSelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectLabel = makeDecoratable("SelectLabel", DecoratableSelectLabel);

/**
 * SelectItem
 */
const DecoratableSelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            [
                "flex items-center justify-between gap-3 cursor-default select-none rounded-sm p-sm mx-sm text-md outline-none",
                "bg-neutral-base text-neutral-primary fill-neutral-xstrong",
                "focus:bg-neutral-dimmed",
                "data-[disabled]:text-neutral-disabled data-[disabled]:cursor-not-allowed",
                "data-[state=checked]:font-semibold"
            ],
            className
        )}
        {...props}
    >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
));
DecoratableSelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectItem = makeDecoratable("SelectItem", DecoratableSelectItem);

/**
 * SelectSeparator
 */
const DecoratableSelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={cn("-mx-sm my-sm h-px bg-neutral-strong", className)}
        {...props}
    />
));
DecoratableSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const SelectSeparator = makeDecoratable("SelectSeparator", DecoratableSelectSeparator);

/**
 * Trigger
 */
type SelectTriggerVm = {
    placeholder: string;
    hasValue: boolean;
};

type SelectTriggerProps = SelectPrimitive.SelectValueProps &
    SelectTriggerVm & {
        size: VariantProps<typeof triggerVariants>["size"];
        variant: VariantProps<typeof triggerVariants>["variant"];
        invalid: VariantProps<typeof triggerVariants>["invalid"];
        startIcon?: React.ReactElement;
        endIcon?: React.ReactElement;
        onValueReset: () => void;
    };

const DecoratableSelectTrigger = ({
    hasValue,
    size,
    variant,
    startIcon,
    endIcon,
    invalid,
    onValueReset,
    ...props
}: SelectTriggerProps) => {
    const resetIcon = React.useMemo(() => {
        if (!hasValue) {
            return undefined;
        }

        return (
            <SelectPrimitive.SelectIcon
                className="bg-neutral-dimmed fill-neutral-xstrong pointer-events-auto"
                onPointerDown={event => {
                    event.stopPropagation();
                    onValueReset();
                }}
            >
                <Close className="w-4 h-4" />
            </SelectPrimitive.SelectIcon>
        );
    }, [hasValue, onValueReset]);

    return (
        <Trigger
            size={size}
            variant={variant}
            invalid={invalid}
            startIcon={startIcon}
            endIcon={endIcon}
            resetIcon={resetIcon}
        >
            <div className={"flex-1 text-left truncate"}>
                <SelectValue {...props} />
            </div>
        </Trigger>
    );
};

const SelectTrigger = makeDecoratable("SelectTrigger", DecoratableSelectTrigger);

/**
 * SelectOptions
 */
type SelectOptionsVm = {
    options: SelectOptionFormatted[];
};

type SelectOptionsProps = SelectOptionsVm;

const DecoratableSelectOptions = (props: SelectOptionsProps) => {
    const renderOptions = React.useCallback((items: SelectOptionFormatted[]) => {
        return items.map((item, index) => {
            const elements = [];

            if (item.options.length > 0) {
                // Render as a group if there are nested options
                elements.push(
                    <SelectGroup key={`group-${index}`}>
                        <SelectLabel>{item.label}</SelectLabel>
                        {renderOptions(item.options)}
                    </SelectGroup>
                );
            }

            if (item.value) {
                // Render as a select item if there are no nested options
                elements.push(
                    <SelectItem
                        key={`item-${item.value}`}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </SelectItem>
                );
            }

            // Conditionally render the separator if hasSeparator is true
            if (item.separator) {
                elements.push(<SelectSeparator key={`separator-${item.value ?? index}`} />);
            }

            return elements;
        });
    }, []);

    return <SelectContent>{renderOptions(props.options)}</SelectContent>;
};

const SelectOptions = makeDecoratable("SelectOptions", DecoratableSelectOptions);

/**
 * SelectRenderer
 */
type SelectRootProps = SelectPrimitive.SelectProps;

type SelectRendererProps = {
    selectRootProps: Omit<SelectRootProps, "onValueChange">;
    selectTriggerProps: Omit<SelectTriggerProps, "onValueReset">;
    selectOptionsProps: SelectOptionsProps;
    onValueChange: (value: string) => void;
    onValueReset: () => void;
};

const DecoratableSelectRenderer = ({
    selectRootProps,
    selectTriggerProps,
    selectOptionsProps,
    onValueChange,
    onValueReset
}: SelectRendererProps) => {
    return (
        <SelectRoot {...selectRootProps} onValueChange={onValueChange}>
            <SelectTrigger {...selectTriggerProps} onValueReset={onValueReset} />
            <SelectOptions {...selectOptionsProps} />
        </SelectRoot>
    );
};

const SelectRenderer = makeDecoratable("SelectRenderer", DecoratableSelectRenderer);

/**
 * Select
 */
type SelectOption = SelectOptionDto | string;

type SelectProps = SelectPrimitive.SelectProps & {
    endIcon?: React.ReactElement;
    invalid?: VariantProps<typeof triggerVariants>["invalid"];
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: SelectOption[];
    placeholder?: string;
    size?: VariantProps<typeof triggerVariants>["size"];
    startIcon?: React.ReactElement;
    variant?: VariantProps<typeof triggerVariants>["variant"];
};

const DecoratableSelect = (props: SelectProps) => {
    const { vm, changeValue, resetValue } = useSelect(props);
    const { size, variant, startIcon, endIcon, invalid, ...selectRootProps } = props;

    return (
        <SelectRenderer
            selectRootProps={{ ...selectRootProps }}
            selectTriggerProps={{
                ...vm.selectTrigger,
                size,
                variant,
                startIcon,
                endIcon,
                invalid
            }}
            selectOptionsProps={vm.selectOptions}
            onValueChange={changeValue}
            onValueReset={resetValue}
        />
    );
};

const Select = makeDecoratable("Select", DecoratableSelect);

export {
    Select,
    SelectRenderer,
    type SelectOption,
    type SelectRootProps,
    type SelectTriggerProps,
    type SelectOptionsProps,
    type SelectProps,
    type SelectTriggerVm,
    type SelectOptionsVm
};
