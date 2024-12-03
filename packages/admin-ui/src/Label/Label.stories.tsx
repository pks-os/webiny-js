import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";
import { Tooltip } from "~/Tooltip";

const meta: Meta<typeof Label> = {
    title: "Components/Form Primitives/Label",
    component: Label,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    decorators: [
        Story => (
            <Tooltip.Provider>
                <Story />
            </Tooltip.Provider>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
    args: {
        text: "Test label",
        htmlFor: "test-field"
    },
    render: args => (
        <>
            <input type="checkbox" id={args.htmlFor} />
            <Label {...args} />
        </>
    )
};

export const LightWeight: Story = {
    args: {
        ...Default.args,
        weight: "light"
    }
};

export const Required: Story = {
    args: {
        ...Default.args,
        required: true
    }
};

export const WithDescription: Story = {
    args: {
        ...Default.args,
        description: "(description)"
    }
};

export const WithHint: Story = {
    args: {
        ...Default.args,
        hint: "This is an additional message in case context to this label needs to be added"
    }
};

export const WithValue: Story = {
    args: {
        ...Default.args,
        value: 24
    },
    render: args => (
        <div className="w-64">
            <Label {...args} />
        </div>
    )
};

export const Disabled: Story = {
    args: {
        htmlFor: "test-field-disabled",
        text: "Test label",
        description: "(description)",
        hint: "This is an additional message in case context to this label needs to be added",
        required: true,
        disabled: true,
        value: 24
    },
    render: args => (
        <div className="w-64">
            <Label {...args} />
        </div>
    )
};
