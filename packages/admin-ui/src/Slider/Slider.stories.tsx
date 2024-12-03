import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
    title: "Components/Form/Slider",
    component: Slider,
    tags: ["autodocs"],
    argTypes: {
        onValueChange: { action: "onValueChange" },
        onValueCommit: { action: "onValueCommit" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Slider {...args} value={value} onValueChange={value => setValue(value)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: {
        ...Default.args,
        label: "Any field label"
    }
};

export const WithLabelRequired: Story = {
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

export const WithSideLabel: Story = {
    args: {
        ...Default.args,
        label: "Any field label",
        labelPosition: "side"
    }
};

export const WithSideLabelRequired: Story = {
    args: {
        ...WithSideLabel.args,
        required: true
    }
};

export const WithSideLabelAndDescription: Story = {
    args: {
        ...WithSideLabel.args,
        description: "Provide the required information for processing your request."
    }
};

export const WithSideLabelAndNotes: Story = {
    args: {
        ...WithSideLabel.args,
        note: "Note: Ensure your selection or input is accurate before proceeding."
    }
};

export const WithSideLabelAndErrors: Story = {
    args: {
        ...WithSideLabel.args,
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const WithSideLabelDisabled: Story = {
    args: {
        ...WithSideLabel.args,
        label: "Any field label",
        disabled: true
    }
};

export const WithSideLabelFullExample: Story = {
    args: {
        ...WithSideLabel.args,
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
