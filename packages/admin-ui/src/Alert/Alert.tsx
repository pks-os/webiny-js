import * as React from "react";
import { cva, type VariantProps, cn, makeDecoratable } from "~/utils";
import { Button } from "~/Button";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as WarningIcon } from "@material-design-icons/svg/outlined/warning_amber.svg";
import { ReactComponent as SuccessIcon } from "@material-design-icons/svg/outlined/check_circle.svg";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";

const VARIANT_ICON_MAP = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: InfoIcon,
    danger: WarningIcon
};

const variants = {
    type: { info: "", success: "", warning: "", danger: "" },
    variant: { strong: "", subtle: "" }
};

const DEFAULT_TYPE = "info";
const DEFAULT_VARIANT = "subtle";

const defaultVariants = {
    type: DEFAULT_TYPE,
    variant: DEFAULT_VARIANT
} as const;

const alertVariants = cva(
    "flex items-center w-full rounded-sm text-md py-sm-extra pl-md pr-sm-plus [&_a]:font-semibold [&_a]:underline",
    {
        variants,
        defaultVariants,
        compoundVariants: [
            {
                type: "info",
                variant: "strong",
                className: "bg-neutral-dark text-neutral-light"
            },
            {
                type: "info",
                variant: "subtle",
                className: "bg-neutral-dimmed text-neutral-primary"
            },
            {
                type: "success",
                variant: "strong",
                className: "bg-secondary-default text-neutral-light"
            },
            {
                type: "success",
                variant: "subtle",
                className: "bg-success-subtle text-neutral-primary"
            },
            {
                type: "warning",
                variant: "strong",
                className: "bg-warning-default text-neutral-primary"
            },
            {
                type: "warning",
                variant: "subtle",
                className: "bg-warning-subtle text-neutral-primary"
            },
            {
                type: "danger",
                variant: "strong",
                className: "bg-destructive-default text-neutral-light"
            },
            {
                type: "danger",
                variant: "subtle",
                className: "bg-destructive-subtle text-neutral-primary"
            }
        ]
    }
);

const alertIconVariants = cva("size-md", {
    variants,
    defaultVariants,
    compoundVariants: [
        { type: "info", variant: "strong", className: "fill-neutral-base" },
        { type: "info", variant: "subtle", className: "fill-neutral-xstrong" },
        { type: "success", variant: "strong", className: "fill-neutral-base" },
        { type: "success", variant: "subtle", className: "fill-success" },
        { type: "warning", variant: "strong", className: "fill-neutral-xstrong" },
        { type: "warning", variant: "subtle", className: "fill-warning" },
        { type: "danger", variant: "strong", className: "fill-neutral-base" },
        { type: "danger", variant: "subtle", className: "fill-destructive" }
    ]
});

const closeButtonVariants = (props: Parameters<typeof alertVariants>[0] = {}) => {
    const { type = DEFAULT_TYPE, variant = DEFAULT_VARIANT } = props;
    if (variant === "subtle") {
        return "ghost";
    }

    if (type === "warning") {
        return "ghost";
    }

    return "ghost-negative";
};

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {
    showCloseButton?: boolean;
    onClose?: () => void;
}

const AlertBase = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, type, variant, showCloseButton, onClose, children, ...props }, ref) => {
        const IconComponent = VARIANT_ICON_MAP[type || "info"];

        return (
            <div
                ref={ref}
                role="alert"
                className={cn(alertVariants({ type, variant }), className)}
                {...props}
            >
                <div className={"shrink-0 self-stretch py-xs"}>
                    <IconComponent className={alertIconVariants({ type, variant })} />
                </div>
                <span className={"flex-grow px-sm-plus"}>{children}</span>
                {showCloseButton && (
                    <div className={"shrink-0 self-stretch"}>
                        <Button
                            onClick={onClose}
                            icon={<XIcon />}
                            size={"sm"}
                            variant={closeButtonVariants({ type, variant })}
                        />
                    </div>
                )}
            </div>
        );
    }
);
AlertBase.displayName = "Alert";

const Alert = makeDecoratable("Alert", AlertBase);

export { Alert };
