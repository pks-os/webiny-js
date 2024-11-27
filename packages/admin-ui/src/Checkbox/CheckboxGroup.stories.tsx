import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./CheckboxGroup";
import { Button } from "~/Button";

const meta: Meta<typeof CheckboxGroup> = {
    title: "Components/CheckboxGroup",
    component: CheckboxGroup,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div className="w-[60%] h-48 mx-auto flex justify-center items-center">
                <Story />
            </div>
        )
    ],
    render: args => {
        const [values, setValues] = useState(args.values);
        return (
            <CheckboxGroup
                {...args}
                values={values}
                onCheckedChange={values => setValues(values)}
            />
        );
    }
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
    args: {
        items: [
            {
                label: "Value 1",
                value: "value-1"
            },
            {
                label: "Value 2",
                value: "value-2"
            },
            {
                label: "Value 3",
                value: "value-3"
            }
        ],
        values: []
    }
};

export const WithSelectedValues: Story = {
    args: {
        items: [
            {
                label: "Value 1",
                value: "value-1"
            },
            {
                label: "Value 2",
                value: "value-2"
            },
            {
                label: "Value 3",
                value: "value-3"
            }
        ],
        values: ["value-2"]
    }
};

export const WithDisabledValue: Story = {
    args: {
        items: [
            {
                label: "Value 1",
                value: "value-1"
            },
            {
                label: "Value 2",
                value: "value-2",
                disabled: true
            },
            {
                label: "Value 3",
                value: "value-3"
            }
        ],
        values: ["value-2"]
    }
};

export const WithExternalValueControl: Story = {
    args: {
        ...Default.args
    },
    render: args => {
        const [values, setValues] = useState(args.values);
        return (
            <div className={"w-full"}>
                <div>
                    <CheckboxGroup
                        {...args}
                        values={values}
                        onCheckedChange={values => setValues(values)}
                    />
                </div>
                <div className={"mt-4 text-center"}>
                    <Button text={"Reset"} onClick={() => setValues([])} />
                </div>
                <div className={"mt-4 text-center"}>
                    Current selected value: <pre>{values.join()}</pre>
                </div>
            </div>
        );
    }
};
