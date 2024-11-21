import React from "react";
import { cn } from "~/utils";
import { makeDecoratable } from "@webiny/react-composition";
import { Heading } from "~/Heading";
import { Text } from "~/Text";
import { cva, type VariantProps } from "class-variance-authority";

const cardRootVariants = cva("flex flex-col bg-neutral-base gap-y-md", {
    variants: {
        padding: {
            standard: "p-lg",
            comfortable: "p-xl",
            compact: "p-md"
        },
        elevation: {
            none: "",
            xs: "shadow-xs",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl"
        },
        borderRadius: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md"
        }
    },
    defaultVariants: {
        padding: "standard",
        elevation: "none",
        borderRadius: "md"
    }
});

interface CardRootProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof cardRootVariants> {}

const CardRootBase = React.forwardRef<HTMLDivElement, CardRootProps>(
    ({ className, padding, elevation, borderRadius, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardRootVariants({ padding, elevation, borderRadius, className }))}
            {...props}
        />
    )
);

CardRootBase.displayName = "CardRoot";

const CardRoot = makeDecoratable("CardRoot", CardRootBase);

interface CardProps extends CardRootProps, VariantProps<typeof cardRootVariants> {
    title?: React.ReactNode | string;
    description?: React.ReactNode | string;
    actions?: React.ReactNode;
    options?: React.ReactNode;
}

interface CardHeaderProps {
    title?: React.ReactNode | string;
    description?: React.ReactNode | string;
}

const CardHeaderBase = ({ title, description }: CardHeaderProps) => {
    return (
        <div className={"flex flex-col gap-y-xs"}>
            {typeof title === "string" ? <Heading level={6} as={"h1"} text={title} /> : title}
            {typeof description === "string" ? (
                <Text text={description} size="sm" className={"text-neutral-strong"} />
            ) : (
                description
            )}
        </div>
    );
};

CardHeaderBase.displayName = "CardHeader";

const CardHeader = makeDecoratable("CardHeader", CardHeaderBase);

interface CardFooterProps {
    actions?: React.ReactNode;
}

const CardFooterBase = ({ actions }: CardFooterProps) => {
    return <div className={"flex justify-end gap-sm"}>{actions}</div>;
};

CardFooterBase.displayName = "CardFooter";

const CardFooter = makeDecoratable("CardFooter", CardFooterBase);

const CardBase = (props: CardProps) => {
    const { title, description, actions, children, options, ...rest } = props;

    return (
        <CardRoot {...rest}>
            <CardHeader title={title} description={description} />
            {children}
            <CardFooter actions={actions} />
        </CardRoot>
    );
};

const Card = makeDecoratable("Card", CardBase);

export { Card, type CardProps };
