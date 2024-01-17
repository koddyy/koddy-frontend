import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "components/Banner",
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Mentor: Story = {
  args: {
    children: "This is a Banner",
    actionText: "Action",
  },
};
