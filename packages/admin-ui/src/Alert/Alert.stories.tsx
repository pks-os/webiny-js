import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import React from "react";

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
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

type Story = StoryObj<typeof Alert>;

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

export const InfoStrong: Story = {
    name: "Info (strong)",
    args: {
        ...Info.args,
        variant: "strong",
        children: (
            <>
                This type of notification is suitable for general usage where there is a need for
                strong accent. And <a href={"#"}>this thing here</a> is a short link.
            </>
        )
    }
};

export const Success: Story = {
    args: {
        ...Default.args,
        type: "success",
        children: (
            <>
                This is a success alert, used when something occurred successfully. And{" "}
                <a href={"#"}>this thing here</a> is a short link.
            </>
        )
    }
};

export const SuccessStrong: Story = {
    name: "Success (strong)",
    args: {
        ...Success.args,
        variant: "strong",
        children: (
            <>
                This is a success alert, used when something occurred successfully and needs to be
                prominent. And <a href={"#"}>this thing here</a> is a short link.
            </>
        )
    }
};

export const Warning: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                This is a warning alert, used when something of strong relevance needs to be
                communicated. And <a href={"#"}>this thing here</a> is a short link.
            </>
        ),
        type: "warning"
    }
};

export const WarningStrong: Story = {
    name: "Warning (strong)",
    args: {
        ...Warning.args,
        children: (
            <>
                This is a warning alert, used when something of strong relevance needs to be
                prominently communicated. And <a href={"#"}>this thing here</a> is a short link.
            </>
        ),
        variant: "strong"
    }
};

export const Danger: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                This is a danger alert, used when something critical needs to be communicated. And{" "}
                <a href={"#"}>this thing here</a> is a short link.
            </>
        ),
        type: "danger"
    }
};

export const DangerStrong: Story = {
    name: "Danger (strong)",
    args: {
        ...Danger.args,
        children: (
            <>
                This is a danger alert, used when something critical needs to be prominently
                communicated. And <a href={"#"}>this thing here</a> is a short link.
            </>
        ),
        variant: "strong"
    }
};

export const WithCloseButton: Story = {
    name: "With close button",
    args: {
        ...Default.args,
        children: <>An alert that can be closed.</>,
        showCloseButton: true,
        onClose: () => alert("Close button clicked.")
    }
};
