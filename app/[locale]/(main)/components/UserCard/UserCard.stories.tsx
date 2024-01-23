import type { Meta, StoryObj } from "@storybook/react";
import { mentee, mentor } from "@/mocks/fixture/user";
import { UserCard } from "./UserCard";

const meta = {
  title: "App/home/UserCard",
  component: UserCard,
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mentor: Story = {
  args: {
    ...mentor,
  },
};

export const Mentee: Story = {
  args: {
    ...mentee,
  },
};
