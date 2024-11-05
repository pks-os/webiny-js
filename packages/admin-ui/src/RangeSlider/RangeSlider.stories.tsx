import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "./RangeSlider";

const meta: Meta<typeof RangeSlider> = {
    title: "Components/RangeSlider",
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

export const Default: Story = {};

export const WithDefaultValues: Story = {
    args: {
        values: [25, 75]
    }
};

export const WithMinAndMaxValues: Story = {
    args: {
        min: 25,
        max: 75
    }
};

export const WithSteps: Story = {
    args: {
        step: 10
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        values: [25, 75]
    }
};

export const WithTooltip: Story = {
    args: {
        showTooltip: true
    }
};

export const WithTooltipSideTop: Story = {
    args: {
        showTooltip: true,
        tooltipSide: "top"
    }
};

export const WithTooltipAndCustomValueTransformer: Story = {
    args: {
        showTooltip: true,
        transformValues: (value: number) => {
            return `${Math.round(value)}%`;
        }
    }
};

export const WithExternalValueControl: Story = {
    args: {
        showTooltip: true,
        transformValues: (value: number) => {
            return `${Math.round(value)}%`;
        }
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
