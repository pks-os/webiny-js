import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as StormIcon } from "@material-design-icons/svg/filled/storm.svg";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
    title: "Components/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        image: <Avatar.Image src="https://github.com/webiny-bot.png" alt="@webiny" />,
        fallback: <Avatar.Fallback delayMs={0}>W</Avatar.Fallback>
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg", "xl"],
            defaultValue: "md"
        },
        variant: {
            control: "select",
            options: ["strong", "subtle", "light", "quiet", "outlined"],
            defaultValue: "strong"
        }
    }
};

export const SizeSm: Story = {
    name: "Small",
    args: {
        ...Default.args,
        size: "sm"
    }
};
export const SizeMd: Story = {
    name: "Medium",
    args: {
        ...Default.args,
        size: "md"
    }
};

export const SizeLg: Story = {
    name: "Large",
    args: {
        ...Default.args,
        size: "lg"
    }
};

export const SizeXl: Story = {
    name: "Extra Large",
    args: {
        ...Default.args,
        size: "xl"
    }
};

export const Text: Story = {
    name: "Fallback Text",
    args: {
        fallback: <Avatar.Fallback>SH</Avatar.Fallback>
    }
};
export const Icon: Story = {
    name: "Icon",
    args: {
        fallback: (
            <Avatar.Fallback>
                <StormIcon />
            </Avatar.Fallback>
        )
    }
};
