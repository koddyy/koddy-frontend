import type { Meta, StoryObj } from "@storybook/react";
import { CoffeeChatCard } from "./CoffeeChatCard";

const meta = {
  title: "App/coffeechat/CoffeeChatCard",
  component: CoffeeChatCard,
} satisfies Meta<typeof CoffeeChatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userRole: "mentor",
    status: "AGREE",
    name: "Hường",
    school: "코띠대학교",
    major: "코띠학부",
    grade: 1,
  },
};
