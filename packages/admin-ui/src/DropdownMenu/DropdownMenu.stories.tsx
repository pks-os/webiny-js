import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import React from "react";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/Menu",
    component: DropdownMenu,
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        Story => (
            <div className="w-[700px]">
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
    args: {
        showCloseButton: true,
        children: "This is an alert. Play around with different properties to see how it looks."
    },
    argTypes: {
        type: {
            control: "select",
            options: ["info", "success", "warning", "danger"]
        },
        variant: {
            control: "select",
            options: ["strong", "subtle"]
        }
    }
};

export const Info: Story = {
    args: {
        ...Default.args,
        type: "info",
        children: (
            <>
                This type of notification is suitable for general usage where there’s no need for
                accent. And <a href={"#"}>this thing here</a> is a short link.
            </>
        )
    }
};

