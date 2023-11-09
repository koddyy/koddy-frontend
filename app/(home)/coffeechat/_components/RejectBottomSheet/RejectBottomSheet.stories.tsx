import type { Meta, StoryObj } from "@storybook/react";
import { RejectBottomSheet } from "./RejectBottomSheet";

const meta = {
  title: "App/coffeechat/RejectBottomSheet",
  component: RejectBottomSheet,
} satisfies Meta<typeof RejectBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userName: "OOO",
  },
};
