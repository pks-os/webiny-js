import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { Button } from "~/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    decorators: [
        Story => (
            <div className="bg-[#fafbfb] h-[500px] w-[700px] rounded-[5px] px-[50px] content-center">
                <Story />
            </div>
        )
    ],
};

export default meta;

type Story = StoryObj<typeof Card>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {

    args: {
        title: "Card title goes here",
        description: "Card description goes here",
        children: <>This is card content. Anything can go in here. This is card content. Anything can go in here.</>,
        actions: (
            <>
                <Button variant={"secondary"} text={"Cancel"} />
                <Button variant={"primary"} text={"Confirm"} />
            </>
        ),
        padding: "standard",
        elevation: "md",
        borderRadius: "md"
    },
    argTypes: {
        padding: {
            control: "select",
            options: ["none", "standard", "comfortable"]
        },
        elevation: {
            control: "select",
            options: ["none", "xs", "sm", "md", "lg", "xl"]
        },
        borderRadius: {
            control: "select",
            options: ["none", "sm", "md", "lg"]
        }
    }
};

export const WithoutHeaderAndFooter: Story = {
    args: {
        children: <>This is card content. Anything can go in here.</>
    }
};

export const WithMorePadding: Story = {
    args: {
        ...Default.args,
        padding: "comfortable"
    }
};

export const WithElevation: Story = {
    args: {
        ...Default.args,
        elevation: "md"
    }
};

export const NoBorderRadius: Story = {
    args: {
        ...Default.args,
        borderRadius: "none"
    }
};
