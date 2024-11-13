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

const StyledCol = ({ ...props }) => (
    <Grid.Col className="bg-primary text-neutral-light p-2 text-md rounded-sm" {...props} />
);

export const Default: Story = {
    args: {
        className: "bg-neutral-light p-4",
        children: (
            <>
                <StyledCol>Col 1</StyledCol>
                <StyledCol span={3}>
                    Col 2 (<code>span: 3</code>)
                </StyledCol>
                <StyledCol>Col 3</StyledCol>
                <StyledCol>Col 4</StyledCol>
                <StyledCol>Col 5</StyledCol>
                <StyledCol>Col 6</StyledCol>
                <StyledCol span={2}>
                    Col 7 (<code>span: 2</code>)
                </StyledCol>
                <StyledCol>Col 8</StyledCol>
                <StyledCol>Col 9</StyledCol>
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
                <StyledCol span={8} offset={2}>
                    Col (<code>span: 8</code>, <code>offset: 2</code>)
                </StyledCol>
                <Grid.Col span={2} />

                {/* Row 2 */}
                <StyledCol span={8} offset={4}>
                    Col (<code>span: 8</code>, <code>offset: 4</code>)
                </StyledCol>

                {/* Row 3 */}
                <StyledCol span={10} offset={1}>
                    Col (<code>span: 10</code>, <code>offset: 1</code>)
                </StyledCol>
                <Grid.Col span={1} />

                {/* Row 4 */}
                <StyledCol span={12}>
                    Col (<code>span: 12</code>)
                </StyledCol>
            </>
        )
    }
};
