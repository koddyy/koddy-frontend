import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ko from "@/messages/ko";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Providers = ({ children }) => {
  return (
    <NextIntlClientProvider locale="ko" messages={ko}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    </NextIntlClientProvider>
  );
};

export const customRender = (ui, options) => {
  return render(ui, { wrapper: Providers, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
