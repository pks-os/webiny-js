import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/Text";
import {  Grid } from "~/Grid";
import { StyledColumn } from "./stories/StyledColumn";

import { Container } from "./Container";

const meta: Meta<typeof Container> = {
    title: "Components/Container",
    component: Container,
    tags: ["autodocs"],
    decorators: [
        Story => (
            <div className="w-[700px]">
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
    args: {
        className: "bg-neutral-light max-w-[500px]",
        children: <Text text={"This is a container."} />
    }
};

export const FluidWidth: Story = {
    args: {
        ...Default.args,
        className: "bg-neutral-light",
        children: (
            <>
                <Text text={"This is a fluid container."} /> <br />
                <Text text={"Fluid container has 100% max-width."} />
            </>
        )
    }
};

export const FixedWidth: Story = {
    args: {
        ...Default.args,
        className: "w-[500px] bg-neutral-light",
        children: (
            <>
                <Text text={"This is a fixed container."} /> <br />
                <Text text={"Fixed container has a fixed width. In this case, 500px."} />
            </>
        )
    }
};

export const ComfortablePadding: Story = {
    args: {
        ...Default.args,
        padding: "comfortable"
    }
};

export const SpaciousPadding: Story = {
    args: {
        ...Default.args,
        padding: "spacious"
    }
};

export const WithGridFluid: Story = {
    name: "With Grid (Fluid)",
    args: {
        ...Default.args,
        className: "bg-neutral-light",
        children: (
            <Grid className={"bg-neutral-light"}>
                <StyledColumn span={3} index={1}/>
                <StyledColumn span={3} index={2}/>
                <StyledColumn span={3} index={3}/>
                <StyledColumn span={3} index={4}/>
            </Grid>
        )
    }
};

export const WithGridFixed: Story = {
    name: "With Grid (Fixed)",
    args: {
        ...Default.args,
        className: "w-[500px] bg-neutral-light",
        children: (
            <Grid>
                <StyledColumn span={3} index={1}/>
                <StyledColumn span={3} index={2}/>
                <StyledColumn span={3} index={3}/>
                <StyledColumn span={3} index={4}/>
            </Grid>
        )
    }
};
