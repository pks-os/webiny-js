import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as MoreVertical } from "@material-design-icons/svg/filled/more_vert.svg";
import { Card } from "./Card";
import { Button } from "~/Button";
import { Container } from "~/Container";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
    decorators: [
        Story => (
            <div className="bg-[#f4f4f4] h-[500px] w-[700px] rounded-[5px] px-[50px] content-center">
                <Container className={"w-[300px]"} padding={"none"}>
                    <Story />
                </Container>
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        title: "Card title goes here",
        description: "Card description goes here",
        children: <>This is card content. Anything can go in here.</>,
        actions: (
            <>
                <Button variant={"secondary"} text={"Cancel"} />
                <Button variant={"primary"} text={"Confirm"} />
            </>
        ),
        padding: "standard",
        elevation: "sm",
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

export const NoTitleDescriptionActionsHeaderAndFooter: Story = {
    name: "Only Body (Without Body, Title, Actions)",
    args: {
        children: <>This is card content. Anything can go in here.</>
    }
};

export const WithMorePadding: Story = {
    args: {
        ...Default.args,
        actions: null,
        padding: "comfortable"
    }
};

export const WithMoreElevation: Story = {
    args: {
        ...Default.args,
        actions: null,
        elevation: "md"
    }
};

export const NoElevation: Story = {
    args: {
        ...Default.args,
        actions: null,
        elevation: "none"
    }
};

export const NoBorderRadius: Story = {
    args: {
        ...Default.args,
        actions: null,
        borderRadius: "none"
    }
};

export const WithOptions: Story = {
    args: {
        ...Default.args,
        actions: null,
        options: (
            <Button
                variant={"ghost"}
                icon={<MoreVertical />}
                iconSize={"lg"}
                onClick={() => alert("Custom action button clicked.")}
            />
        )
    }
};

export const WithActions: Story = {
    args: Default.args
};

