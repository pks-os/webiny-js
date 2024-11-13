import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, withStaticProps } from "~/utils";

const columnVariants = cva("", {
    variants: {
        span: {
            auto: "col-auto",
            1: "col-span-1",
            2: "col-span-2",
            3: "col-span-3",
            4: "col-span-4",
            5: "col-span-5",
            6: "col-span-6",
            7: "col-span-7",
            8: "col-span-8",
            9: "col-span-9",
            10: "col-span-10",
            11: "col-span-11",
            12: "col-span-12"
        },
        offset: {
            1: "col-start-2",
            2: "col-start-3",
            3: "col-start-4",
            4: "col-start-5",
            5: "col-start-6",
            6: "col-start-7",
            7: "col-start-8",
            8: "col-start-9",
            9: "col-start-10",
            10: "col-start-11",
            11: "col-start-12"
        },
        align: {
            top: "self-start",
            middle: "self-center",
            bottom: "self-end"
        }
    },
    defaultVariants: {
        span: "auto"
    }
});

interface ColumnProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof columnVariants> {
    children?: React.ReactNode;
}

const ColBase = React.forwardRef<HTMLDivElement, ColumnProps>(
    ({ span, align, children, className, offset, ...props }, ref) => {
        return (
            <div
                {...props}
                className={cn(columnVariants({ span, offset, align, className }))}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

ColBase.displayName = "Col";

const Col = makeDecoratable("Col", ColBase);

const gridVariants = cva("grid", {
    variants: {
        gap: {
            comfortable: "px-xl gap-lg",
            spacious: "px-xxl gap-xl"
        }
    },
    defaultVariants: {
        gap: "comfortable"
    }
});

interface GridProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof gridVariants> {
    children:
        | React.ReactElement<ColumnProps, typeof Col>
        | Array<React.ReactElement<ColumnProps, typeof Col>>;
}

const GridBase = React.forwardRef<HTMLDivElement, GridProps>(
    ({ gap, children, className, ...props }, ref) => {
        return (
            <div
                {...props}
                className={cn("grid-cols-12", gridVariants({ gap }), className)}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

GridBase.displayName = "Grid";

const DecoratableGrid = makeDecoratable("Grid", GridBase);

const Grid = withStaticProps(DecoratableGrid, { Col });

export { Grid, type GridProps, type ColumnProps };
