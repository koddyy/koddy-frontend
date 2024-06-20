import type { Preview } from "@storybook/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize, mswLoader, mswDecorator } from "msw-storybook-addon";
import { nextIntlDecorator } from "../libs/storybook-decorators";
import "@/styles/globals.css";

initialize();

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "ko", title: "KO" },
          { value: "en", title: "EN" },
        ],
        showName: true,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    mswDecorator,
    nextIntlDecorator,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;
