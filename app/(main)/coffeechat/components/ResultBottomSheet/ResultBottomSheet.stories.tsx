import type { Meta, StoryObj } from "@storybook/react";
import { ResultBottomSheet } from "./ResultBottomSheet";

const meta = {
  title: "App/coffeechat/ResultBottomSheet",
  component: ResultBottomSheet,
  args: {
    resultType: "positive",
    description: ["OOO님과의", "커피챗이 예약되었습니다."],
  },
} satisfies Meta<typeof ResultBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
