import type { Meta, StoryObj } from "@storybook/react";
import { QuestionToMenteeBottomSheet } from "./QuestionToMenteeBottomSheet";

const meta: Meta<typeof QuestionToMenteeBottomSheet> = {
  title: "App/coffeechat/QuestionToMenteeBottomSheet",
  component: QuestionToMenteeBottomSheet,
};

export default meta;
type Story = StoryObj<typeof QuestionToMenteeBottomSheet>;

export const Primary: Story = {
  args: {
    isOpen: true,
  },
};
