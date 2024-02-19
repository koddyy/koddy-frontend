import type { Meta, StoryObj } from "@storybook/react";
import { CoffeeChatSchedule } from "./CoffeeChatSchedule";

const meta: Meta<typeof CoffeeChatSchedule> = {
  title: "App/coffeechat/CoffeeChatSchedule",
  component: CoffeeChatSchedule,
};

export default meta;
type Story = StoryObj<typeof CoffeeChatSchedule>;

export const Primary: Story = {
  args: {
    schedule: "2023/11/01 15:00~15:30 (한국 시간 기준)",
  },
};
