import type { Meta, StoryObj } from "@storybook/react";
import { ProfileImageUpload } from "./ProfileImageUpload";

const meta = {
  title: "App/common/ProfileImageUpload",
  component: ProfileImageUpload,
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
