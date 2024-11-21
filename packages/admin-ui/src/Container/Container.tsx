import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils";

const containerVariants = cva("m-auto", {
    variants: {
        padding: {
            none: "px-none",
            comfortable: "px-xl",
            spacious: "px-xxl"
        }
    },
    defaultVariants: {
        padding: "comfortable"
    }
});

interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof containerVariants> {
    children: React.ReactNode;
}

const ContainerBase = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ padding, children, className, ...props }, ref) => {
        return (
            <div {...props} className={cn(containerVariants({ padding }), className)} ref={ref}>
                {children}
            </div>
        );
    }
);

ContainerBase.displayName = "Container";

const Container = makeDecoratable("Container", ContainerBase);

export { Container, type ContainerProps };
