import { StoryFn } from "@storybook/react";
import { IntlProvider } from "use-intl";
import koMessages from "@/messages/ko";

export const nextIntlDecorator = (Story: StoryFn) => {
  return (
    <IntlProvider locale="ko" messages={koMessages}>
      <Story />
    </IntlProvider>
  );
};
