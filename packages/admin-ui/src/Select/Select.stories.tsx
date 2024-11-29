import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as SearchIcon } from "@material-design-icons/svg/outlined/search.svg";
import { ReactComponent as ChevronRight } from "@material-design-icons/svg/outlined/chevron_right.svg";
import { Select } from "./Select";
import { Button } from "~/Button";

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
    tags: ["autodocs"],
    argTypes: {
        onValueChange: { action: "onValueChange" },
        onOpenChange: { action: "onOpenChange" },
        variant: { control: "select", options: ["primary", "secondary", "ghost"] },
        size: { control: "select", options: ["md", "lg", "xl"] },
        disabled: { control: "boolean" },
        invalid: { control: "boolean" }
    },
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div className="w-1/3 h-64 mx-auto flex justify-center items-center">
                <Story />
            </div>
        )
    ],
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Select {...args} value={value} onValueChange={setValue} />;
    }
};

export default meta;

type Story = StoryObj<typeof Select>;

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

export const MediumSize: Story = {
    args: {
        ...Default.args,
        size: "md"
    }
};

export const LargeSize: Story = {
    args: {
        ...Default.args,
        size: "lg"
    }
};

export const ExtraLargeSize: Story = {
    args: {
        ...Default.args,
        size: "xl"
    }
};

export const WithCustomPlaceholder: Story = {
    args: {
        ...Default.args,
        placeholder: "Custom placeholder"
    }
};

export const WithStartIcon: Story = {
    args: {
        ...Default.args,
        startIcon: <SearchIcon />
    }
};

export const WithEndIconIcon: Story = {
    args: {
        ...Default.args,
        endIcon: <SearchIcon />
    }
};

export const WithStartAndEndIcons: Story = {
    args: {
        ...Default.args,
        startIcon: <SearchIcon />,
        endIcon: <ChevronRight />
    }
};

export const PrimaryVariant: Story = {
    args: {
        ...Default.args,
        variant: "primary"
    }
};

export const PrimaryVariantDisabled: Story = {
    args: {
        ...PrimaryVariant.args,
        disabled: true
    }
};

export const PrimaryVariantInvalid: Story = {
    args: {
        ...PrimaryVariant.args,
        invalid: true
    }
};

export const SecondaryVariant: Story = {
    args: {
        variant: "secondary",
        placeholder: "Custom placeholder"
    }
};

export const SecondaryVariantDisabled: Story = {
    args: {
        ...SecondaryVariant.args,
        disabled: true
    }
};

export const SecondaryVariantInvalid: Story = {
    args: {
        ...SecondaryVariant.args,
        invalid: true
    }
};

export const GhostVariant: Story = {
    args: {
        variant: "ghost",
        placeholder: "Custom placeholder"
    }
};

export const GhostVariantDisabled: Story = {
    args: {
        ...GhostVariant.args,
        disabled: true
    }
};

export const GhostVariantInvalid: Story = {
    args: {
        ...GhostVariant.args,
        invalid: true
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
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return (
            <div className={"w-full"}>
                <div>
                    <Select {...args} value={value} onValueChange={value => setValue(value)} />
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
