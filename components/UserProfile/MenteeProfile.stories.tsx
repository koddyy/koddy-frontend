import type { Meta, StoryObj } from "@storybook/react";
import { mentee } from "@/mocks/fixture/user";
import { MenteeProfile } from "./MenteeProfile";

const meta: Meta<typeof MenteeProfile> = {
  title: "App/common/MenteeProfile",
  component: MenteeProfile,
};

export default meta;
type Story = StoryObj<typeof MenteeProfile>;

export const Primary: Story = {
  args: { ...mentee },
};
