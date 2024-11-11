import * as React from "react";
import { ReactComponent as CloseIcon } from "@material-design-icons/svg/outlined/close.svg";
import { ReactComponent as NotificationsIconActive } from "@material-design-icons/svg/outlined/notifications_active.svg";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { Heading } from "~/Heading";
import { Text } from "~/Text";
import { Icon, IconProps } from "~/Icon";

const ToastProvider = ToastPrimitives.Provider;

/**
 * Toast Viewport
 */
const DecoratableToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "fixed top-0 right-0 bottom-auto z-[100] flex max-h-screen flex-col p-4",
            className
        )}
        {...props}
    />
));
DecoratableToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const ToastViewport = makeDecoratable("ToastViewport", DecoratableToastViewport);

/**
 * Toast Root
 */
const toastVariants = cva(
    [
        "group pointer-events-auto relative flex w-full items-center justify-start p-md gap-sm-extra self-stretch overflow-hidden rounded-md border-sm border-neutral-dimmed shadow-lg transition-all",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full"
    ],
    {
        variants: {
            variant: {
                default: "default-variant bg-neutral-dark",
                subtle: "subtle-variant bg-white"
            },
            hasDescription: {
                true: "has-description items-start justify-start"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

const DecoratableToastRoot = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, hasDescription, variant, ...props }, ref) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(toastVariants({ variant, hasDescription }), className)}
            {...props}
        />
    );
});
DecoratableToastRoot.displayName = ToastPrimitives.Root.displayName;

const ToastRoot = makeDecoratable("ToastRoot", DecoratableToastRoot);

/**
 * Toast Actions
 */
const DecoratableToastActions = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
    <div {...props} className={"mt-md flex w-full items-center justify-start gap-sm"} ref={ref}>
        {children}
    </div>
));
DecoratableToastActions.displayName = "ToastActions";

const ToastActions = makeDecoratable("ToastActions", DecoratableToastActions);

/**
 * Toast Close Icon
 */
const DecoratableToastClose = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Close>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Close
        ref={ref}
        className={cn(
            "focus:outline-none group-[.default-variant]:fill-neutral-base group-[.subtle-variant]:fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        <Icon label={"Close"} icon={<CloseIcon />} aria-hidden={true} />
    </ToastPrimitives.Close>
));
DecoratableToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastClose = makeDecoratable("ToastClose", DecoratableToastClose);

/**
 * Toast Icon
 */
type ToastIconProps = {
    icon?: React.ReactElement<IconProps>;
};

const DecoratableNotificationIcon = () => (
    <Icon icon={<NotificationsIconActive />} label={"Notification"} aria-hidden={true} />
);

const NotificationIcon = makeDecoratable("NotificationIcon", DecoratableNotificationIcon);

const DecoratableToastIcon = ({ icon = <NotificationIcon /> }: ToastIconProps) => (
    <div className={"fill-accent-default"}>
        <span className="h-3 w-3">{icon}</span>
    </div>
);

const ToastIcon = makeDecoratable("ToastIcon", DecoratableToastIcon);

/**
 * Toast Title
 */
type ToastTitleProps = Omit<ToastPrimitives.ToastTitleProps, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastTitle = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Title>,
    ToastTitleProps
>(({ text, className, ...props }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        {...props}
        asChild
        className={cn(
            "group-[.default-variant]:text-neutral-light group-[.subtle-variant]:text-neutral-primary font-normal group-[.has-description]:font-semibold",
            className
        )}
    >
        <Heading level={6} text={text} />
    </ToastPrimitives.Title>
));
DecoratableToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastTitle = makeDecoratable("ToastTitle", DecoratableToastTitle);

/**
 * Toast Description
 */
type ToastDescriptionProps = Omit<ToastPrimitives.ToastDescriptionProps, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastDescription = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Description>,
    ToastDescriptionProps
>(({ text, className, ...props }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        {...props}
        asChild
        className={cn(
            "mt-xs-plus group-[.default-variant]:text-neutral-dimmed group-[.subtle-variant]:text-neutral-strong",
            className
        )}
    >
        <Text text={text} as={"div"} size={"md"} className={"text-neutral-dimmed"} />
    </ToastPrimitives.Description>
));
DecoratableToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastDescription = makeDecoratable("ToastDescription", DecoratableToastDescription);

/**
 * Toast
 */
type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastRoot>;

interface ToastProps extends Omit<ToastRootProps, "title" | "content" | "children"> {
    title: React.ReactElement<ToastTitleProps>;
    description?: React.ReactElement<ToastDescriptionProps>;
    icon?: React.ReactElement<IconProps>;
    actions?: React.ReactElement<typeof ToastActions>;
}

const DecoratableToast = ({ title, description, icon, actions, ...props }: ToastProps) => {
    return (
        <ToastRoot hasDescription={!!description || !!actions} {...props}>
            <ToastIcon icon={icon} />
            <div className="w-64">
                {title}
                {description && description}
                {actions && actions}
            </div>
            <ToastClose />
        </ToastRoot>
    );
};

const Toast = withStaticProps(makeDecoratable("Toast", DecoratableToast), {
    Title: ToastTitle,
    Description: ToastDescription,
    Actions: ToastActions,
    Provider: ToastProvider,
    Viewport: ToastViewport
});

export { Toast, type ToastRootProps, type ToastProps };
