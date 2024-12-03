import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "./RangeSlider";

const meta: Meta<typeof RangeSlider> = {
    title: "Components/Form/RangeSlider",
    component: RangeSlider,
    tags: ["autodocs"],
    argTypes: {
        onValuesChange: { action: "onValuesChange" },
        onValuesCommit: { action: "onValuesCommit" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [values, setValues] = useState(args.values);
        return (
            <RangeSlider {...args} values={values} onValuesChange={values => setValues(values)} />
        );
    }
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
    args: {
        label: "Any field label"
    }
};

export const WithLabelRequired: Story = {
    args: {
        ...Default.args,
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
