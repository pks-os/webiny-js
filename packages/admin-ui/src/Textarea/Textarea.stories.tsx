import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
    title: "Components/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "onChange" },
        rows: {
            control: {
                type: "number"
            }
        }
    },
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div className="w-1/3 h-auto mx-auto p-6 flex justify-center items-center">
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const MediumSize: Story = {
    args: {
        placeholder: "Custom placeholder",
        size: "md"
    }
};

export const LargeSize: Story = {
    args: {
        placeholder: "Custom placeholder",
        size: "lg"
    }
};

export const ExtraLargeSize: Story = {
    args: {
        placeholder: "Custom placeholder",
        size: "xl"
    }
};

export const PrimaryVariant: Story = {
    args: {
        variant: "primary",
        placeholder: "Custom placeholder"
    }
};

export const PrimaryVariantDisabled: Story = {
    args: {
        ...PrimaryVariant.args,
        disabled: true
    }
};

export const PrimaryVariantInvalid: Story = {
    args: {
        ...PrimaryVariant.args,
        invalid: true
    }
};

export const SecondaryVariant: Story = {
    args: {
        variant: "secondary",
        placeholder: "Custom placeholder"
    }
};

export const SecondaryVariantDisabled: Story = {
    args: {
        ...SecondaryVariant.args,
        disabled: true
    }
};

export const SecondaryVariantInvalid: Story = {
    args: {
        ...SecondaryVariant.args,
        invalid: true
    }
};

export const GhostVariant: Story = {
    args: {
        variant: "ghost",
        placeholder: "Custom placeholder"
    }
};

export const GhostVariantDisabled: Story = {
    args: {
        ...GhostVariant.args,
        disabled: true
    }
};

export const GhostVariantInvalid: Story = {
    args: {
        ...GhostVariant.args,
        invalid: true
    }
};
