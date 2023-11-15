import type { Meta, StoryObj } from "@storybook/react";
import { PendingBottomSheet } from "./PendingBottomSheet";

const meta = {
  title: "App/coffeechat/PendingBottomSheet",
  component: PendingBottomSheet,
  args: {
    resultType: "positive",
    description: ["OOO님에게", "커피챗을 제안하시겠습니까?"],
  },
} satisfies Meta<typeof PendingBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
