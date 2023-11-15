import type { Meta, StoryObj } from "@storybook/react";
import { BottomNavigation } from "./BottomNavigation";

const meta = {
  title: "App/common/BottomNavigation",
  component: BottomNavigation,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["home"], ["reservation"], ["mypage"]],
      },
    },
  },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
