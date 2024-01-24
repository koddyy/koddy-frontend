import type { Meta, StoryObj } from "@storybook/react";
import { mentor } from "@/mocks/fixture/user";
import { MentorProfile } from "./MentorProfile";

const meta: Meta<typeof MentorProfile> = {
  title: "App/common/MentorProfile",
  component: MentorProfile,
};

export default meta;
type Story = StoryObj<typeof MentorProfile>;

export const Primary: Story = {
  args: { ...mentor },
};
