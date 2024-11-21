import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
    title: "Components/Grid",
    component: Grid,
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof Grid>;

const StyledColumn = ({ ...props }) => (
    <Grid.Column className="bg-primary text-neutral-light p-2 text-md rounded-sm" {...props} />
);

export const Default: Story = {
    args: {
        className: "bg-neutral-light p-4",
        children: (
            <>
                <StyledColumn>Col 1</StyledColumn>
                <StyledColumn span={3}>
                    Col 2 (<code>span: 3</code>)
                </StyledColumn>
                <StyledColumn>Col 3</StyledColumn>
                <StyledColumn>Col 4</StyledColumn>
                <StyledColumn>Col 5</StyledColumn>
                <StyledColumn>Col 6</StyledColumn>
                <StyledColumn span={2}>
                    Col 7 (<code>span: 2</code>)
                </StyledColumn>
                <StyledColumn>Col 8</StyledColumn>
                <StyledColumn>Col 9</StyledColumn>
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
    decorators: [
        Story => (
            <div className="w-full">
                <Story />
            </div>
        )
    ],
    args: {
        ...Default.args,
        children: (
            <>
                {/* Row 1 */}
                <StyledColumn span={8} offset={2}>
                    Col (<code>span: 8</code>, <code>offset: 2</code>)
                </StyledColumn>
                <Grid.Column span={2} />

                {/* Row 2 */}
                <StyledColumn span={8} offset={4}>
                    Col (<code>span: 8</code>, <code>offset: 4</code>)
                </StyledColumn>

                {/* Row 3 */}
                <StyledColumn span={10} offset={1}>
                    Col (<code>span: 10</code>, <code>offset: 1</code>)
                </StyledColumn>
                <Grid.Column span={1} />

                {/* Row 4 */}
                <StyledColumn span={12}>
                    Col (<code>span: 12</code>)
                </StyledColumn>
            </>
        )
    }
};
