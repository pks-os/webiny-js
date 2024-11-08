import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as PencilIcon } from "@material-design-icons/svg/filled/edit.svg";
import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        variant: { control: "select", options: ["primary", "secondary", "tertiary", "ghost"] },
        size: { control: "select", options: ["sm", "md", "lg", "xl"] },
        disabled: { control: "boolean" },
        text: { control: "text" },
        // Note: after upgrading to Storybook 8.X, use `fn`from `@storybook/test` to spy on the onClick argument.
        onClick: { action: "onClick" }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        variant: "primary",
        text: "Button"
    }
};

export const Secondary: Story = {
    args: {
        ...Primary.args,
        variant: "secondary"
    }
};

export const Tertiary: Story = {
    args: {
        ...Primary.args,
        variant: "tertiary"
    }
};

export const Ghost: Story = {
    args: {
        ...Primary.args,
        variant: "ghost"
    }
};

export const Small: Story = {
    args: {
        ...Primary.args,
        size: "sm"
    }
};

export const Medium: Story = {
    args: {
        ...Primary.args,
        size: "md"
    }
};

export const Large: Story = {
    args: {
        ...Primary.args,
        size: "lg"
    }
};

export const ExtraLarge: Story = {
    args: {
        ...Primary.args,
        size: "xl"
    }
};

export const WithIcon: Story = {
    args: {
        ...Primary.args,
        icon: <PencilIcon />
    }
};

export const WithIconPositionEnd: Story = {
    args: {
        ...Primary.args,
        icon: <PencilIcon />,
        iconPosition: "end"
    }
};

export const OnlyIcon: Story = {
    args: {
        ...Primary.args,
        text: null,
        icon: <PencilIcon />,
        iconPosition: "end"
    }
};
