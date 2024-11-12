import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { withStaticProps, cn } from "~/utils";

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

const AvatarImageBase = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    AvatarImageProps
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image ref={ref} className={cn("aspect-square", className)} {...props} />
));
AvatarImageBase.displayName = AvatarPrimitive.Image.displayName;

const AvatarImage = makeDecoratable("AvatarImage", AvatarImageBase);

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

const AvatarFallbackBase = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center rounded-sm", className)}
        {...props}
    />
));

AvatarFallbackBase.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarFallback = makeDecoratable("AvatarFallback", AvatarFallbackBase);

interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
        VariantProps<typeof avatarVariants> {
    image: React.ReactElement<AvatarImageProps>;
    fallback?: React.ReactElement<AvatarFallbackProps>;
}

const avatarVariants = cva("relative flex shrink-0 overflow-hidden border-sm border-transparent", {
    variants: {
        size: {
            sm: "text-h6 rounded-sm p-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&>*]:size-md",
            md: "text-h6 rounded-sm p-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&>*]:size-lg",
            lg: "text-h6 rounded-sm p-[calc(theme(padding.sm)-theme(borderWidth.sm))] [&>*]:size-lg",
            xl: "text-h4 rounded-md p-[calc(theme(padding.sm)-theme(borderWidth.sm))] [&>*]:size-xl"
        },
        variant: {
            strong: "bg-primary text-neutral-light [&_svg]:fill-neutral-base",
            subtle: "bg-neutral-light text-neutral-primary [&_svg]:fill-neutral-xstrong",
            light: "bg-neutral-dimmed text-neutral-primary [&_svg]:fill-neutral-xstrong",
            quiet: "bg-transparent text-neutral-primary [&_svg]:fill-neutral-xstrong",
            outlined:
                "bg-neutral-base !border-neutral-muted border-sm text-accent-primary [&_svg]:fill-neutral-xstrong"
        }
    },
    defaultVariants: {
        size: "md",
        variant: "strong"
    }
});

const AvatarBase = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
    ({ image, fallback, className, size, variant, ...props }, ref) => {
        return (
            <AvatarPrimitive.Root
                ref={ref}
                className={avatarVariants({ variant, size, className })}
                {...props}
            >
                {image}
                {fallback}
            </AvatarPrimitive.Root>
        );
    }
);

AvatarBase.displayName = AvatarPrimitive.Root.displayName;

const DecoratableAvatar = makeDecoratable("Avatar", AvatarBase);

const Avatar = withStaticProps(DecoratableAvatar, {
    Fallback: AvatarFallback,
    Image: AvatarImage
});

export { Avatar, type AvatarProps, type AvatarImageProps, type AvatarFallbackProps };
