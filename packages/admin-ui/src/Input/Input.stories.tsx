import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "~/Input";

const meta: Meta<typeof Input> = {
    title: "Components/Form/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "onChange" },
        type: {
            control: "select",
            options: [
                "text",
                "number",
                "email",
                "password",
                "tel",
                "url",
                "search",
                "date",
                "datetime-local",
                "month",
                "week",
                "time",
                "color",
                "file",
                "checkbox",
                "radio",
                "range",
                "hidden",
                "button",
                "submit",
                "reset",
                "image"
            ],
            defaultValue: "text"
        }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Input {...args} value={value} onChange={e => setValue(e.target.value)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
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
        description: "Provide the required information for processing your request."
    }
};

export const WithNotes: Story = {
    args: {
        note: "Note: Ensure your selection or input is accurate before proceeding."
    }
};

export const WithErrors: Story = {
    args: {
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const Disabled: Story = {
    args: {
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
