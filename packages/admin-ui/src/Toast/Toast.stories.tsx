import React from "react";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";
import { Button } from "~/Button";
import { Icon } from "~/Icon";

const meta: Meta<typeof Toast> = {
    title: "Components/Toast",
    component: Toast,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen"
    },
    argTypes: {
        // Note: after upgrading to Storybook 8.X, use `fn`from `@storybook/test` to spy on the onOpenChange argument.
        onOpenChange: { action: "onOpenChange" },
        variant: { control: "select", options: ["default", "subtle"] }
    },
    decorators: [
        (Story, context) => {
            const { args } = context;
            const [open, setOpen] = React.useState<boolean>(false);
            const timerRef = React.useRef(0);

            React.useEffect(() => {
                return () => clearTimeout(timerRef.current);
            }, []);

            return (
                <Toast.Provider>
                    <div className="w-full h-64 flex justify-center items-center">
                        <Button
                            text={"Display Toast"}
                            onClick={() => {
                                setOpen(false);
                                window.clearTimeout(timerRef.current);
                                timerRef.current = window.setTimeout(() => {
                                    setOpen(true);
                                }, 100);
                            }}
                        />
                        <Story
                            args={{
                                ...args,
                                open: open,
                                onOpenChange: open => {
                                    setOpen(open);
                                    if (typeof args.onOpenChange === "function") {
                                        args.onOpenChange(open);
                                    }
                                }
                            }}
                        />
                        <Toast.Viewport />
                    </div>
                </Toast.Provider>
            );
        }
    ]
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
    args: {
        title: <Toast.Title text={"New entry created"} />
    }
};

export const SubtleVariant: Story = {
    args: {
        ...Default.args,
        variant: "subtle"
    }
};

export const WithDescription: Story = {
    args: {
        ...Default.args,
        description: (
            <Toast.Description text={'Entry "Article One" has been successfully created'} />
        )
    }
};

export const WithActions: Story = {
    args: {
        ...Default.args,
        actions: (
            <Toast.Actions>
                <Button
                    key={"action-1"}
                    text={"Do the action"}
                    onClick={() => console.log("doTheAction")}
                />
                <Button
                    key={"action-2"}
                    text={"Dismiss"}
                    onClick={() => console.log("dismiss")}
                    variant={"secondary"}
                />
            </Toast.Actions>
        )
    }
};

export const WithDescriptionAndActions: Story = {
    args: {
        ...Default.args,
        description: (
            <Toast.Description text={'Entry "Article One" has been successfully created'} />
        ),
        actions: (
            <Toast.Actions>
                <Button
                    key={"action-1"}
                    text={"Do the action"}
                    onClick={() => console.log("doTheAction")}
                />
                <Button
                    key={"action-2"}
                    text={"Dismiss"}
                    onClick={() => console.log("dismiss")}
                    variant={"secondary"}
                />
            </Toast.Actions>
        )
    }
};

export const WithCustomIcon: Story = {
    args: {
        ...Default.args,
        icon: <Icon icon={<SettingsIcon />} label={"Settings"} />
    }
};
