import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta = {
  title: "App/home/UserCard",
  component: UserCard,
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "Hường",
    description: "description",
    nationality: "베트남인",
    languages: ["베트남어", "영어", "힌국어"],
  },
};
