import type { Meta, StoryObj } from "@storybook/react";
import { RejectCoffeeChatBottomSheet } from "./RejectCoffeeChatBottomSheet";

const meta = {
  title: "App/coffeechat/RejectCoffeeChatBottomSheet",
  component: RejectCoffeeChatBottomSheet,
} satisfies Meta<typeof RejectCoffeeChatBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userName: "OOO",
  },
};
