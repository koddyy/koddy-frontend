import type { Meta, StoryObj } from "@storybook/react";
import { handlers as coffeeChatHandlers } from "@/mocks/handlers/coffeechat";
import { CoffeeChatTypeSelectBottomSheet } from "./CoffeeChatTypeSelectBottomSheet";

const meta: Meta<typeof CoffeeChatTypeSelectBottomSheet> = {
  title: "App/coffeechat/CoffeeChatTypeSelectBottomSheet",
  component: CoffeeChatTypeSelectBottomSheet,
  parameters: {
    msw: {
      handlers: [...coffeeChatHandlers],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoffeeChatTypeSelectBottomSheet>;

export const Primary: Story = {
  args: {},
};
