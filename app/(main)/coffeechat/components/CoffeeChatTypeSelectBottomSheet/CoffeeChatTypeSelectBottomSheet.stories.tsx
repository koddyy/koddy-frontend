import type { Meta, StoryObj } from "@storybook/react";
import { CoffeeChatTypeSelectBottomSheet } from "./CoffeeChatTypeSelectBottomSheet";

const meta: Meta<typeof CoffeeChatTypeSelectBottomSheet> = {
  title: "App/coffeechat/CoffeeChatTypeSelectBottomSheet",
  component: CoffeeChatTypeSelectBottomSheet,
};

export default meta;
type Story = StoryObj<typeof CoffeeChatTypeSelectBottomSheet>;

export const Primary: Story = {
  args: {},
};
