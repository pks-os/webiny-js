import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/Text";

import { Container } from "./Container";

const meta: Meta<typeof Container> = {
    title: "Components/Container",
    component: Container,
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
    args: {
        className: "bg-neutral-light p-4",
        children: <Text text={"This is a container."} />
    }
};

export const ComfortableGap: Story = {
    args: {
        ...Default.args,
        padding: "comfortable"
    }
};

export const SpaciousGap: Story = {
    args: {
        ...Default.args,
        padding: "spacious"
    }
};
