import type { Meta, StoryObj } from "@storybook/react";
import { MentorFilterBottomSheet } from "./MentorFilterBottomSheet";

const meta: Meta<typeof MentorFilterBottomSheet> = {
  title: "App/home/MentorFilterBottomSheet",
  component: MentorFilterBottomSheet,
};

export default meta;
type Story = StoryObj<typeof MentorFilterBottomSheet>;

export const Primary: Story = {
  args: {},
};
