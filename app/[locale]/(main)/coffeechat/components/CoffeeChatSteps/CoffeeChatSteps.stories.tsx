import type { Meta, StoryObj } from "@storybook/react";
import { nextIntlDecorator } from "@/libs/storybook-decorators";
import { handlers } from "@/mocks/handlers/coffeechat";
import { CoffeeChatSteps } from "./CoffeeChatSteps";

const meta: Meta<typeof CoffeeChatSteps> = {
  title: "App/coffeechat/CoffeeChatSteps",
  component: CoffeeChatSteps,
  decorators: [nextIntlDecorator],
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoffeeChatSteps>;

export const Primary: Story = {
  args: {
    role: "mentor",
  },
};
