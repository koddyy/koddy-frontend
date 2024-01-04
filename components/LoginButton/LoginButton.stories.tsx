import type { Meta, StoryObj } from "@storybook/react";
import { LoginButton } from "./LoginButton";

const meta: Meta<typeof LoginButton> = {
  component: LoginButton,
  args: {
    provider: "kakao",
  },
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Primary: Story = {};
