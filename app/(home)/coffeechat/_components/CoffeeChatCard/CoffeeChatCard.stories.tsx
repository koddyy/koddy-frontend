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
    userType: "mentor",
    coffeechatStatus: "expected",
    userName: "Hường",
    description: "description",
  },
};
