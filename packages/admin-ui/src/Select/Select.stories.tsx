import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "~/Select";

const meta: Meta<typeof Select> = {
    title: "Components/Form/Select",
    component: Select,
    tags: ["autodocs"],
    argTypes: {
        onValueChange: { action: "onValueChange" },
        onOpenChange: { action: "onOpenChange" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Select {...args} value={value} onValueChange={setValue} />;
    }
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        options: [
            "Eastern Standard Time (EST)",
            "Central Standard Time (CST)",
            "Pacific Standard Time (PST)",
            "Greenwich Mean Time (GMT)",
            "Central European Time (CET)",
            "Central Africa Time (CAT)",
            "India Standard Time (IST)",
            "China Standard Time (CST)",
            "Japan Standard Time (JST)",
            "Australian Western Standard Time (AWST)",
            "New Zealand Standard Time (NZST)",
            "Fiji Time (FJT)",
            "Argentina Time (ART)",
            "Bolivia Time (BOT)",
            "Brasilia Time (BRT)"
        ]
    }
};

export const WithLabel: Story = {
    args: {
        ...Default.args,
        label: "Any field label"
    }
};

export const WithRequiredLabel: Story = {
    args: {
        ...Default.args,
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
        label: "Any field label",
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
