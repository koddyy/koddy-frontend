import type { Meta, StoryObj } from "@storybook/react";
import { NavigationBar } from "./NavigationBar";

const meta = {
  title: "App/common/NavigationBar",
  component: NavigationBar,
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle = {
  args: {
    title: "회원가입",
  },
};
