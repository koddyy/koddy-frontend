import type { Meta, StoryObj } from "@storybook/react";
import { nextIntlDecorator } from "@/libs/storybook-decorators";
import { handlers } from "@/mocks/handlers/coffeechat";
import { CoffeeChatCount } from "./CoffeeChatCount";

const meta: Meta<typeof CoffeeChatCount> = {
  title: "App/coffeechat/CoffeeChatCount",
  component: CoffeeChatCount,
  decorators: [nextIntlDecorator],
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoffeeChatCount>;

export const Primary: Story = {
  args: {
    role: "mentor",
  },
};
