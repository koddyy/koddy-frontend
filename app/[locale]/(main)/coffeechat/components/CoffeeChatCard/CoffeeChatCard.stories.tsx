import type { Meta, StoryObj } from "@storybook/react";
import { mentee, mentor } from "@/mocks/fixture/user";
import { CoffeeChatCard } from "./CoffeeChatCard";

const meta = {
  title: "App/coffeechat/CoffeeChatCard",
  component: CoffeeChatCard,
} satisfies Meta<typeof CoffeeChatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MentorCard: Story = {
  args: {
    status: "APPROVE",
    ...mentor,
  },
};

export const MenteeCard: Story = {
  args: {
    status: "APPROVE",
    ...mentee,
  },
};
