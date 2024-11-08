import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "./RangeSlider";

const meta: Meta<typeof RangeSlider> = {
    title: "Components/Form/RangeSlider",
    component: RangeSlider,
    tags: ["autodocs"],
    argTypes: {
        onValuesChange: { action: "onValuesChange" },
        onValuesCommit: { action: "onValuesCommit" }
    },
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div className="w-[60%] h-32 mx-auto flex justify-center items-center">
                <Story />
            </div>
        )
    ],
    render: args => {
        const [values, setValues] = useState(args.values);
        return (
            <RangeSlider {...args} values={values} onValuesChange={values => setValues(values)} />
        );
    }
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
    args: {
        label: "Label"
    }
};

export const WithDefaultValues: Story = {
    args: {
        label: "Label",
        values: [25, 75]
    }
};

export const WithMinAndMaxValues: Story = {
    args: {
        label: "Label",
        min: 25,
        max: 75
    }
};

export const WithSteps: Story = {
    args: {
        label: "Label",
        step: 10
    }
};

export const Disabled: Story = {
    args: {
        label: "Label",
        disabled: true,
        values: [25, 75]
    }
};

export const WithTooltip: Story = {
    args: {
        label: "Label",
        showTooltip: true
    }
};

export const WithTooltipSideTop: Story = {
    args: {
        label: "Label",
        showTooltip: true,
        tooltipSide: "top"
    }
};

export const WithCustomValueConverter: Story = {
    args: {
        label: "Label",
        transformValues: (value: number) => {
            return `${Math.round(value)}%`;
        }
    }
};

export const WithCustomValueConverterAndTooltip: Story = {
    args: {
        label: "Label",
        showTooltip: true,
        transformValues: (value: number) => {
            return `${Math.round(value)}%`;
        }
    }
};

export const WithExternalValueControl: Story = {
    args: {
        label: "Label"
    },
    render: args => {
        const defaultValues = args.values ?? [25, 75];
        const [values, setValues] = useState(defaultValues);
        return (
            <div className={"w-full"}>
                <div>
                    <RangeSlider
                        {...args}
                        values={values}
                        onValuesChange={values => setValues(values)}
                    />
                </div>
                <div className={"mt-4 text-center"}>
                    <button onClick={() => setValues(defaultValues)}>{"Reset"}</button>
                </div>
                <div className={"mt-4 text-center"}>
                    Current value: <code>{values.toString()}</code>
                </div>
            </div>
        );
    }
};
