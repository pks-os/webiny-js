import React from "react";
import { ReactComponent as XIcon } from "@material-design-icons/svg/round/close.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { Icon } from "../Icon";

const meta: Meta<typeof Tag> = {
    title: "Components/Tag",
    component: Tag,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
    args: {
        label: "Label"
    }
};

export const WithIcon: Story = {
    args: {
        ...Default.args,
        icon: <Icon icon={<XIcon />} label={"Close"} size={"sm"} />
    }
};

export const NeutralBase: Story = {
    args: {
        ...WithIcon.args,
        variant: "neutral-base"
    }
};

export const NeutralBaseDisabled: Story = {
    args: {
        ...NeutralBase.args,
        disabled: true
    }
};

export const NeutralLight: Story = {
    args: {
        ...WithIcon.args,
        variant: "neutral-light"
    }
};

export const NeutralLightDisabled: Story = {
    args: {
        ...NeutralLight.args,
        disabled: true
    }
};

export const NeutralStrong: Story = {
    args: {
        ...WithIcon.args,
        variant: "neutral-strong"
    }
};

export const NeutralStrongDisabled: Story = {
    args: {
        ...NeutralStrong.args,
        disabled: true
    }
};

export const NeutralDark: Story = {
    args: {
        ...WithIcon.args,
        variant: "neutral-dark"
    }
};

export const NeutralDarkDisabled: Story = {
    args: {
        ...NeutralDark.args,
        disabled: true
    }
};

export const Accent: Story = {
    args: {
        ...WithIcon.args,
        variant: "accent"
    }
};

export const AccentDisabled: Story = {
    args: {
        ...Accent.args,
        disabled: true
    }
};

export const Success: Story = {
    args: {
        ...WithIcon.args,
        variant: "success"
    }
};

export const SuccessDisabled: Story = {
    args: {
        ...Success.args,
        disabled: true
    }
};

export const Warning: Story = {
    args: {
        ...WithIcon.args,
        variant: "warning"
    }
};

export const WarningDisabled: Story = {
    args: {
        ...Warning.args,
        disabled: true
    }
};

export const Destructive: Story = {
    args: {
        ...WithIcon.args,
        variant: "destructive"
    }
};

export const DestructiveDisabled: Story = {
    args: {
        ...Destructive.args,
        disabled: true
    }
};
