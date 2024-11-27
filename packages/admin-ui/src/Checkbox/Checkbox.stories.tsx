import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
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
        label: "Label"
    }
};

export const Checked: Story = {
    args: {
        ...Default.args,
        checked: true
    }
};

export const Indeterminate: Story = {
    args: {
        ...Default.args,
        indeterminate: true
    }
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
};
