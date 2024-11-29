import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Text } from "~/Text";
import { Button } from "~/Button";

const meta: Meta<typeof RadioGroup> = {
    title: "Components/RadioGroup",
    component: RadioGroup,
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
        const [value, setValue] = useState(args.value);
        return <RadioGroup {...args} value={value} onValueChange={value => setValue(value)} />;
    }
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    args: {
        items: [
            {
                value: "value-1",
                label: "Value 1"
            },
            {
                value: "value-2",
                label: "Value 2"
            },
            {
                value: "value-3",
                label: "Value 3"
            }
        ]
    }
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        value: "value-2",
        disabled: true,
        items: [
            {
                value: "value-1",
                label: "Value 1"
            },
            {
                value: "value-2",
                label: "Value 2"
            },
            {
                value: "value-3",
                label: "Value 3"
            }
        ]
    }
};

export const WithDefaultOption: Story = {
    args: {
        ...Default.args,
        value: "value-2"
    }
};

export const WithDisabledOption: Story = {
    args: {
        ...Default.args,
        items: [
            {
                value: "value-1",
                label: "Value 1"
            },
            {
                value: "value-2",
                label: "Value 2",
                disabled: true
            },
            {
                value: "value-3",
                label: "Value 3"
            }
        ]
    }
};

export const WithDefaultDisabledOption: Story = {
    args: {
        ...Default.args,
        value: "value-2",
        items: [
            {
                value: "value-1",
                label: "Value 1"
            },
            {
                value: "value-2",
                label: "Value 2",
                disabled: true
            },
            {
                value: "value-3",
                label: "Value 3"
            }
        ]
    }
};

export const WithLongOption: Story = {
    args: {
        ...Default.args,
        items: [
            {
                value: "value-1",
                label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla magna vel massa suscipit mollis. Nunc dui felis, iaculis id tortor ut, hendrerit pulvinar felis."
            },
            {
                value: "value-2",
                label: " Pellentesque erat ipsum, posuere dapibus diam id, accumsan sagittis mi. In eu nibh ut nunc ultricies placerat.",
                disabled: true
            },
            {
                value: "value-3",
                label: "Integer a hendrerit dui. Sed tincidunt vel nibh a finibus."
            }
        ]
    }
};

export const WithComplexOptions: Story = {
    args: {
        ...Default.args,
        items: [
            {
                id: "value-1",
                value: "value-1",
                label: (
                    <div>
                        <div>{"Value 1"}</div>
                        <Text text={"Option description 1"} size={"sm"} />
                    </div>
                )
            },
            {
                id: "value-2",
                value: "value-2",
                label: (
                    <div>
                        <div>{"Value 2"}</div>
                        <Text text={"Option description 2"} size={"sm"} />
                    </div>
                )
            },
            {
                id: "value-3",
                value: "value-3",
                label: (
                    <div>
                        <div>{"Value 3"}</div>
                        <Text text={"Option description 3"} size={"sm"} />
                    </div>
                )
            }
        ]
    }
};

export const WithExternalValueControl: Story = {
    args: {
        value: "value-2",
        items: [
            {
                value: "value-1",
                label: "Value 1"
            },
            {
                value: "value-2",
                label: "Value 2"
            },
            {
                value: "value-3",
                label: "Value 3"
            }
        ]
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return (
            <div className={"w-full"}>
                <div>
                    <RadioGroup {...args} value={value} onValueChange={value => setValue(value)} />
                </div>
                <div className={"mt-4 text-center"}>
                    <Button onClick={() => setValue(args.value)} text={"Reset"} />
                </div>
                <div className={"mt-4 text-center"}>
                    Current selected value: <pre>{value}</pre>
                </div>
            </div>
        );
    }
};
