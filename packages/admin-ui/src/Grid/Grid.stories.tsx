import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Grid } from "./Grid";
import { Container } from "~/Container";
import { StyledColumn } from "./stories/StyledColumn";

const meta: Meta<typeof Grid> = {
    title: "Components/Grid",
    component: Grid,
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
    args: {
        className: "bg-neutral-light p-4",
        children: (
            <>
                <StyledColumn index={1} />
                <StyledColumn index={2} span={3} />
                <StyledColumn index={3} />
                <StyledColumn index={4} />
                <StyledColumn index={5} />
                <StyledColumn index={6} />
                <StyledColumn index={7} span={2} />
                <StyledColumn index={8} />
                <StyledColumn index={9} />
            </>
        )
    }
};

export const SpaciousGap: Story = {
    args: {
        ...Default.args,
        gap: "spacious"
    }
};

export const WithOffset: Story = {
    parameters: {
        layout: "padded"
    },
    args: {
        ...Default.args,
        children: (
            <>
                {/* Row 1 */}
                <StyledColumn span={8} offset={2} index={1} />
                <Grid.Column span={2} />

                {/* Row 2 */}
                <StyledColumn span={8} offset={4} index={1} />

                {/* Row 3 */}
                <StyledColumn span={10} offset={1} index={1} />
                <Grid.Column span={1} />

                {/* Row 4 */}
                <StyledColumn span={12} index={1} />
            </>
        )
    }
};

export const WithContainerFluid: Story = {
    name: "With Container (Fluid)",
    decorators: [
        Story => (
            <div className="w-[700px]">
                <Story />
            </div>
        )
    ],
    render: ({ children }) => (
        <Container className={"bg-neutral-light"}>
            <Grid>{children}</Grid>
        </Container>
    ),
    args: {
        ...Default.args,
        children: (
            <>
                <StyledColumn span={3} index={1} />
                <StyledColumn span={3} index={2} />
                <StyledColumn span={3} index={3} />
                <StyledColumn span={3} index={4} />
            </>
        )
    }
};

export const WithContainerFixed: Story = {
    name: "With Container (Fixed)",
    decorators: [
        Story => (
            <div className="w-[700px]">
                <Story />
            </div>
        )
    ],
    render: ({ children }) => (
        <Container className={"w-[500px] bg-neutral-light"}>
            <Grid>{children}</Grid>
        </Container>
    ),
    args: {
        ...Default.args,
        children: (
            <>
                <StyledColumn span={3} index={1} />
                <StyledColumn span={3} index={2} />
                <StyledColumn span={3} index={3} />
                <StyledColumn span={3} index={4} />
            </>
        )
    }
};
