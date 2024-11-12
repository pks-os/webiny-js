import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["accent", "subtle"]
        },
        align: {
            control: "select",
            options: ["start", "center", "end"]
        },
        side: {
            control: "select",
            options: ["top", "right", "bottom", "left"]
        },
        showArrow: {
            control: "boolean",
            defaultValue: true
        }
    },
    decorators: [
        Story => (
            <Tooltip.Provider>
                <div className="flex justify-center items-center h-48">
                    <Story />
                </div>
            </Tooltip.Provider>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        trigger: <p>Tooltip trigger</p>,
        content: (
            <>
                <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. Donec
                viverra sit amet massa sagittis sollicitudin.
            </>
        )
    }
};
