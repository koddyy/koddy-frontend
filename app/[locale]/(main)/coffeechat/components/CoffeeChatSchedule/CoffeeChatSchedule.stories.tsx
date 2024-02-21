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
    startTime: "2024-01-01T09:00:00",
    endTime: "2024-01-01T09:30:00",
    chatType: "zoom",
    chatValue: "https://us04web.zoom.us/j/afdsafdf",
  },
};
