import * as React from "react";
import { cva, type VariantProps, cn, makeDecoratable } from "~/utils";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as WarningIcon } from "@material-design-icons/svg/outlined/warning_amber.svg";
import { ReactComponent as SuccessIcon } from "@material-design-icons/svg/outlined/check_circle.svg";

const VARIANT_ICON_MAP = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: InfoIcon,
    danger: WarningIcon
};

const alertVariants = cva(
    [
        "flex items-center w-full rounded-sm text-md py-sm-plus pl-md pr-sm",
        "[&>svg]:size-md [&>svg]:m-xs [&>svg]:mr-[calc(theme(margin.xs)+theme(margin.sm))]"
    ],
    {
        variants: {
            type: { info: "", success: "", warning: "", danger: "" },
            variant: { strong: "", subtle: "" }
        },
        compoundVariants: [
            {
                type: "info",
                variant: "strong",
                className: "bg-neutral-dark text-neutral-light [&>svg]:fill-neutral-base"
            },
            {
                type: "info",
                variant: "subtle",
                className: "bg-neutral-dimmed text-neutral-primary [&>svg]:fill-neutral-xstrong"
            },
            {
                type: "success",
                variant: "strong",
                className: "bg-secondary-default text-neutral-light [&>svg]:fill-neutral-base"
            },
            {
                type: "success",
                variant: "subtle",
                className: "bg-success-subtle text-neutral-primary [&>svg]:fill-success"
            },
            {
                type: "warning",
                variant: "strong",
                className: "bg-warning-default text-neutral-primary [&>svg]:fill-neutral-primary"
            },
            {
                type: "warning",
                variant: "subtle",
                className: "bg-warning-subtle text-neutral-primary [&>svg]:fill-warning"
            },
            {
                type: "danger",
                variant: "strong",
                className: "bg-destructive-default text-neutral-light [&>svg]:fill-neutral-base"
            },
            {
                type: "danger",
                variant: "subtle",
                className: "bg-destructive-subtle text-neutral-primary [&>svg]:fill-destructive"
            }
        ],
        defaultVariants: {
            type: "info",
            variant: "subtle"
        }
    }
);


export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {}

const AlertBase = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, type, variant, ...props }, ref) => {
        const IconComponent = VARIANT_ICON_MAP[type || "info"];
        return (
            <div
                ref={ref}
                role="alert"
                className={cn(alertVariants({ type, variant }), className)}
                {...props}
            >
                <IconComponent /> {props.children}
            </div>
        )
    }
);
AlertBase.displayName = "Alert";

const Alert = makeDecoratable("Alert", AlertBase);

export { Alert };
