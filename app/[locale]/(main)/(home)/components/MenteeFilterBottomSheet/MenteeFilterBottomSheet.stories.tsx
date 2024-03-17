import type { Meta, StoryObj } from "@storybook/react";
import { MenteeFilterBottomSheet } from "./MenteeFilterBottomSheet";

const meta: Meta<typeof MenteeFilterBottomSheet> = {
  title: "App/home/MenteeFilterBottomSheet",
  component: MenteeFilterBottomSheet,
};

export default meta;
type Story = StoryObj<typeof MenteeFilterBottomSheet>;

export const Primary: Story = {
  args: {},
};
