import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "~/Switch";

const meta: Meta<typeof Switch> = {
    title: "Components/Form/Switch",
    component: Switch,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [checked, setChecked] = useState(args.checked);
        return <Switch {...args} checked={checked} onCheckedChange={value => setChecked(value)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        label: "Any field label"
    }
};

export const WithLabelRequired: Story = {
    args: {
        label: "Any field label",
        required: true
    }
};

export const WithDescription: Story = {
    args: {
        ...Default.args,
        description: "Provide the required information for processing your request."
    }
};

export const WithNotes: Story = {
    args: {
        ...Default.args,
        note: "Note: Ensure your selection or input is accurate before proceeding."
    }
};

export const WithErrors: Story = {
    args: {
        ...Default.args,
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
};

export const FullExample: Story = {
    args: {
        ...Default.args,
        label: "Any field label",
        required: true,
        description: "Provide the required information for processing your request.",
        note: "Note: Ensure your selection or input is accurate before proceeding.",
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};
