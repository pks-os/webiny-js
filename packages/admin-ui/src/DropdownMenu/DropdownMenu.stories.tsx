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
    title: "Components/Dropdown Menu",
    component: DropdownMenu,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const { Label, Separator, Group, Item } = DropdownMenu;

export const Default: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        children: (
            <>
                <Label content={"My Account"} />
                <Item icon={<User />} content={"Profile"} />
                <Group>
                    <Item icon={<CreditCard />} content={"Billing"} />
                    <Item icon={<Settings />} content={"Settings"} />
                    <Item icon={<Keyboard />} content={"Keyboard shortcuts"} />
                </Group>
                <Separator />
                <Group>
                    <Item icon={<Users />} content={"Team"} />
                    <Item icon={<UserPlus />} content={"Invite users"}>
                        <Item icon={<Mail />} content={"Email"} />
                        <Item icon={<MessageSquare />} content={"Message"} />
                        <Separator />
                        <Item icon={<PlusCircle />} content={"More..."} />
                    </Item>
                    <Item icon={<Plus />} content={"New Team"} />
                </Group>
                <Separator />
                <Item icon={<LifeBuoy />} content={"Support"} />
                <Item icon={<Cloud />} content={"API"} disabled />
                <Separator />
                <Item icon={<LogOut />} content={"Log out"} />
            </>
        )
    },
    argTypes: {}
};
