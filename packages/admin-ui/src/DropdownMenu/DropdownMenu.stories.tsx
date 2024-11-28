import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { ButtonBase as Button } from "~/Button";
import { ReactComponent as Cloud } from "@material-design-icons/svg/outlined/cloud.svg";
import { ReactComponent as LogOut } from "@material-design-icons/svg/outlined/logout.svg";
import { ReactComponent as LifeBuoy } from "@material-design-icons/svg/outlined/safety_check.svg";
import { ReactComponent as CreditCard } from "@material-design-icons/svg/outlined/credit_score.svg";
import { ReactComponent as Plus } from "@material-design-icons/svg/outlined/add.svg";
import { ReactComponent as PlusCircle } from "@material-design-icons/svg/outlined/add_circle.svg";
import { ReactComponent as Settings } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as Users } from "@material-design-icons/svg/outlined/people.svg";
import { ReactComponent as UserPlus } from "@material-design-icons/svg/outlined/person_add.svg";
import { ReactComponent as User } from "@material-design-icons/svg/outlined/person.svg";
import { ReactComponent as Keyboard } from "@material-design-icons/svg/outlined/keyboard.svg";
import { ReactComponent as Mail } from "@material-design-icons/svg/outlined/mail.svg";
import { ReactComponent as MessageSquare } from "@material-design-icons/svg/outlined/chat_bubble.svg";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const { Content, Label, Separator, Group, Item, Sub, Trigger, SubTrigger, Portal, SubContent } =
    DropdownMenu;

export const Default: Story = {
    args: {
        children: (
            <>
                <Trigger asChild>
                    <Button variant="primary" text={"Open"} />
                </Trigger>
                <Content className="w-56">
                    <Label>My Account</Label>
                    <Group>
                        <Item icon={<User />}>Profile</Item>
                        <Item icon={<CreditCard />}>Billing</Item>
                        <Item icon={<Settings />}>Settings</Item>
                        <Item icon={<Keyboard />}>Keyboard shortcuts</Item>
                    </Group>
                    <Separator />
                    <Group>
                        <Item icon={<Users />}>Team</Item>

                        {/*<Sub>*/}
                        {/*    <SubTrigger>*/}
                        {/*        <UserPlus />*/}
                        {/*        <span>Invite users</span>*/}
                        {/*    </SubTrigger>*/}
                        {/*    <Portal>*/}
                        {/*        <SubContent>*/}
                        {/*            <Item>*/}
                        {/*                <Mail />*/}
                        {/*                <span>Email</span>*/}
                        {/*            </Item>*/}
                        {/*            <Item>*/}
                        {/*                <MessageSquare />*/}
                        {/*                <span>Message</span>*/}
                        {/*            </Item>*/}
                        {/*            <Separator />*/}
                        {/*            <Item>*/}
                        {/*                <PlusCircle />*/}
                        {/*                <span>More...</span>*/}
                        {/*            </Item>*/}
                        {/*        </SubContent>*/}
                        {/*    </Portal>*/}
                        {/*</Sub>*/}

                        <Item icon={<Plus />} shortcut={"⌘+T"}>
                            New Team
                        </Item>
                    </Group>
                    <Separator />
                    <Item icon={<LifeBuoy />}>Support</Item>
                    <Item icon={<Cloud />} disabled>
                        API
                    </Item>
                    <Separator />
                    <Item icon={<LogOut />}>Log out</Item>
                </Content>
            </>
        )
    },
    argTypes: {}
};
