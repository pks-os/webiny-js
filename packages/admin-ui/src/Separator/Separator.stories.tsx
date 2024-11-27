import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";
import React from "react";
import { Heading } from "~/Heading";
import { Text } from "~/Text";

const meta: Meta<typeof Separator> = {
    title: "Components/Separator",
    component: Separator,
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

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
    args: {
        variant: "subtle",
        margin: "lg"
    },
    render: props => {
        return (
            <div>
                <div className="space-y-1">
                    <Heading level={6} text={"This is a heading."} />
                    <Text
                        text={"This is a short description here"}
                        size="sm"
                        className={"text-neutral-strong"}
                    />
                </div>
                <Separator margin={props.margin} variant={props.variant} />
                <div className="flex items-center h-6 text-sm">
                    <Text text={"This is text 1."} />
                </div>
            </div>
        );
    },
    argTypes: {
        margin: {
            control: "select",
            options: ["xs", "sm", "md", "lg", "xl"]
        },
        variant: {
            control: "select",
            options: ["strong", "subtle", "dimmed", "white", "transparent"]
        }
    }
};

export const VerticalAndHorizontal: Story = {
    render: () => {
        return (
            <div>
                <div className="space-y-1">
                    <Heading level={6} text={"This is a heading."} />
                    <Text
                        text={"This is a short description here"}
                        size="sm"
                        className={"text-neutral-strong"}
                    />
                </div>
                <Separator margin={"lg"} />
                <div className="flex items-center h-6 text-sm">
                    <Text text={"This is text 1."} />
                    <Separator orientation="vertical" margin={"lg"} />
                    <Text text={"This is text 2."} />
                    <Separator orientation="vertical" margin={"lg"} />
                    <Text text={"This is text 3."} />
                </div>
            </div>
        );
    }
};

export const HorizontalOrientation: Story = {
    args: {
        orientation: "horizontal"
    },
    render: () => {
        return (
            <div>
                <div className="space-y-1">
                    <Heading level={6} text={"This is a heading."} />
                    <Text
                        text={"This is a short description here"}
                        size="sm"
                        className={"text-neutral-strong"}
                    />
                </div>
                <Separator margin={"lg"} />
                <div className="flex items-center h-6 text-sm">
                    <Text text={"This is text 1."} />
                </div>
            </div>
        );
    }
};

export const VerticalOrientation: Story = {
    args: {
        orientation: "vertical"
    },
    render: () => {
        return (
            <div className="flex justify-center h-6 text-sm">
                <Text text={"This is text 1."} />
                <Separator orientation="vertical" margin={"lg"} />
                <Text text={"This is text 2."} />
                <Separator orientation="vertical" margin={"lg"} />
                <Text text={"This is text 3."} />
            </div>
        );
    }
};

export const LessMargin: Story = {
    render: () => {
        return (
            <div>
                <div className="space-y-1">
                    <Heading level={6} text={"This is a heading."} />
                    <Text
                        text={"This is a short description here"}
                        size="sm"
                        className={"text-neutral-strong"}
                    />
                </div>
                <Separator margin={"md"} />
                <div className="flex items-center h-6 text-sm">
                    <Text text={"This is text 1."} />
                    <Separator orientation="vertical" margin={"md"} />
                    <Text text={"This is text 2."} />
                    <Separator orientation="vertical" margin={"md"} />
                    <Text text={"This is text 3."} />
                </div>
            </div>
        );
    }
};

export const MoreMargin: Story = {
    render: () => {
        return (
            <div>
                <div className="space-y-1">
                    <Heading level={6} text={"This is a heading."} />
                    <Text
                        text={"This is a short description here"}
                        size="sm"
                        className={"text-neutral-strong"}
                    />
                </div>
                <Separator margin={"xl"} />
                <div className="flex items-center h-6 text-sm">
                    <Text text={"This is text 1."} />
                    <Separator orientation="vertical" margin={"xl"} />
                    <Text text={"This is text 2."} />
                    <Separator orientation="vertical" margin={"xl"} />
                    <Text text={"This is text 3."} />
                </div>
            </div>
        );
    }
};
