import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "~/Checkbox";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Form/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [checked, setChecked] = useState(args.checked);
        return (
            <Checkbox
                {...args}
                checked={checked}
                onCheckedChange={checked => setChecked(checked)}
            />
        );
    }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: "Any field label"
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
