import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AutoCompletePrimitive } from "./AutoCompletePrimitive";

const meta: Meta<typeof AutoCompletePrimitive> = {
    title: "Components/Form Primitives/Autocomplete",
    component: AutoCompletePrimitive,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <AutoCompletePrimitive {...args} value={value} onValueChange={setValue} />;
    }
};

export default meta;

type Story = StoryObj<typeof AutoCompletePrimitive>;

export const Default: Story = {
    args: {
        options: [
            { label: "Eastern Standard Time (EST)", value: "est" },
            { label: "Central Standard Time (CST)", value: "cst" },
            { label: "Pacific Standard Time (PST)", value: "pst" },
            { label: "Greenwich Mean Time (GMT)", value: "gmt" },
            { label: "Central European Time (CET)", value: "cet" },
            { label: "Central Africa Time (CAT)", value: "cat" },
            { label: "India Standard Time (IST)", value: "ist" },
            { label: "China Standard Time (CST)", value: "cst_china" },
            { label: "Japan Standard Time (JST)", value: "jst" },
            { label: "Australian Western Standard Time (AWST)", value: "awst" },
            { label: "New Zealand Standard Time (NZST)", value: "nzst" },
            { label: "Fiji Time (FJT)", value: "fjt" },
            { label: "Argentina Time (ART)", value: "art" },
            { label: "Bolivia Time (BOT)", value: "bot" },
            { label: "Brasilia Time (BRT)", value: "brt" }
        ]
    }
};
