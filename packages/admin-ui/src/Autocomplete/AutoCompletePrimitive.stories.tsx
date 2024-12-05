import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AutoCompletePrimitive } from "./AutoCompletePrimitive";
import { SelectPrimitive } from "~/Select";
import { Button } from "~/Button";

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
            "Eastern Standard Time (EST)",
            "Central Standard Time (CST)",
            "Pacific Standard Time (PST)",
            "Greenwich Mean Time (GMT)",
            "Central European Time (CET)",
            "Central Africa Time (CAT)",
            "India Standard Time (IST)",
            "China Standard Time (CST)",
            "Japan Standard Time (JST)",
            "Australian Western Standard Time (AWST)",
            "New Zealand Standard Time (NZST)",
            "Fiji Time (FJT)",
            "Argentina Time (ART)",
            "Bolivia Time (BOT)",
            "Brasilia Time (BRT)"
        ]
    }
};

export const WithPredefinedValue: Story = {
    args: {
        ...Default.args,
        value: "Eastern Standard Time (EST)"
    }
};

export const WithCustomPlaceholder: Story = {
    args: {
        ...Default.args,
        placeholder: "Custom placeholder"
    }
};

export const WithFormattedOptions: Story = {
    args: {
        ...Default.args,
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

export const WithOptionGroups: Story = {
    args: {
        ...Default.args,
        options: [
            {
                label: "North America",
                options: [
                    { label: "Eastern Standard Time (EST)", value: "est" },
                    { label: "Central Standard Time (CST)", value: "cst" },
                    { label: "Pacific Standard Time (PST)", value: "pst" }
                ]
            },
            {
                label: "Europe & Africa",
                options: [
                    { label: "Greenwich Mean Time (GMT)", value: "gmt" },
                    { label: "Central European Time (CET)", value: "cet" },
                    { label: "Central Africa Time (CAT)", value: "cat" }
                ]
            },
            {
                label: "Asia",
                options: [
                    { label: "India Standard Time (IST)", value: "ist" },
                    { label: "China Standard Time (CST)", value: "cst_china" },
                    { label: "Japan Standard Time (JST)", value: "jst" }
                ]
            },
            {
                label: "Australia & Pacific",
                options: [
                    { label: "Australian Western Standard Time (AWST)", value: "awst" },
                    { label: "New Zealand Standard Time (NZST)", value: "nzst" },
                    { label: "Fiji Time (FJT)", value: "fjt" }
                ]
            },
            {
                label: "South America",
                options: [
                    { label: "Argentina Time (ART)", value: "art" },
                    { label: "Bolivia Time (BOT)", value: "bot" },
                    { label: "Brasilia Time (BRT)", value: "brt" }
                ]
            }
        ]
    }
};

export const WithSeparators: Story = {
    args: {
        ...Default.args,
        options: [
            { label: "Eastern Standard Time (EST)", value: "est" },
            { label: "Central Standard Time (CST)", value: "cst" },
            { label: "Pacific Standard Time (PST)", value: "pst", separator: true },
            { label: "Greenwich Mean Time (GMT)", value: "gmt" },
            { label: "Central European Time (CET)", value: "cet" },
            { label: "Central Africa Time (CAT)", value: "cat", separator: true },
            { label: "India Standard Time (IST)", value: "ist" },
            { label: "China Standard Time (CST)", value: "cst_china" },
            { label: "Japan Standard Time (JST)", value: "jst", separator: true },
            { label: "Australian Western Standard Time (AWST)", value: "awst" },
            { label: "New Zealand Standard Time (NZST)", value: "nzst" },
            { label: "Fiji Time (FJT)", value: "fjt", separator: true },
            { label: "Argentina Time (ART)", value: "art" },
            { label: "Bolivia Time (BOT)", value: "bot" },
            { label: "Brasilia Time (BRT)", value: "brt" }
        ]
    }
};

export const WithDisabledOptions: Story = {
    args: {
        options: [
            { label: "Eastern Standard Time (EST)", value: "est", disabled: true },
            { label: "Central Standard Time (CST)", value: "cst", disabled: true },
            { label: "Pacific Standard Time (PST)", value: "pst", disabled: true },
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

export const WithExternalValueControl: Story = {
    args: {
        ...Default.args,
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
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return (
            <div className={"w-full"}>
                <div>
                    <AutoCompletePrimitive
                        {...args}
                        value={value}
                        onValueChange={value => setValue(value)}
                    />
                </div>
                <div className={"mt-4 text-center"}>
                    <Button text={"Reset"} onClick={() => setValue("")} />
                </div>
                <div className={"mt-4 text-center"}>
                    Current selected value: <pre>{value}</pre>
                </div>
            </div>
        );
    }
};
