"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import { useToast } from "@/components/Toast";

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const constants = useTranslations("constants.error");

  const { showToast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
            retry: 0,
          },
          mutations: {
            onError: (error) => {
              if (isAxiosError(error) && error.response) {
                const { errorCode = "", message = constants("description") } = error.response.data;
                const errorMessage = `${error.response.status} ${errorCode} ${message}`;

                showToast({
                  type: "error",
                  content: errorMessage,
                });
              }
            },
          },
        },
      })
  );

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
