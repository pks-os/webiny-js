import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { ButtonBase as Button } from "~/Button";
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users
} from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/Menu",
    component: DropdownMenu,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const {
    Content,
    Label,
    Separator,
    Group,
    Item,
    Sub,
    Trigger,
    SubTrigger,
    Portal,
    SubContent,
    Shortcut
} = DropdownMenu;

export const Default: Story = {
    args: {
        children: (
            <>
                <Trigger asChild>
                    <Button variant="primary" text={"Open"} />
                </Trigger>
                <Content className="w-56">
                    <Label>My Account</Label>
                    <Separator />
                    <Group>
                        <Item>
                            <User />
                            <span>Profile</span>
                            <Shortcut>⇧⌘P</Shortcut>
                        </Item>
                        <Item>
                            <CreditCard />
                            <span>Billing</span>
                            <Shortcut>⌘B</Shortcut>
                        </Item>
                        <Item>
                            <Settings />
                            <span>Settings</span>
                            <Shortcut>⌘S</Shortcut>
                        </Item>
                        <Item>
                            <Keyboard />
                            <span>Keyboard shortcuts</span>
                            <Shortcut>⌘K</Shortcut>
                        </Item>
                    </Group>
                    <Separator />
                    <Group>
                        <Item>
                            <Users />
                            <span>Team</span>
                        </Item>
                        <Sub>
                            <SubTrigger>
                                <UserPlus />
                                <span>Invite users</span>
                            </SubTrigger>
                            <Portal>
                                <SubContent>
                                    <Item>
                                        <Mail />
                                        <span>Email</span>
                                    </Item>
                                    <Item>
                                        <MessageSquare />
                                        <span>Message</span>
                                    </Item>
                                    <Separator />
                                    <Item>
                                        <PlusCircle />
                                        <span>More...</span>
                                    </Item>
                                </SubContent>
                            </Portal>
                        </Sub>
                        <Item>
                            <Plus />
                            <span>New Team</span>
                            <Shortcut>⌘+T</Shortcut>
                        </Item>
                    </Group>
                    <Separator />
                    <Item>
                        <Github />
                        <span>GitHub</span>
                    </Item>
                    <Item>
                        <LifeBuoy />
                        <span>Support</span>
                    </Item>
                    <Item disabled>
                        <Cloud />
                        <span>API</span>
                    </Item>
                    <Separator />
                    <Item>
                        <LogOut />
                        <span>Log out</span>
                        <Shortcut>⇧⌘Q</Shortcut>
                    </Item>
                </Content>
            </>
        )
    },
    argTypes: {}
};
