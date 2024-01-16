import { PropsWithChildren, Suspense, type SuspenseProps } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";

export const SSRSafeSuspense = ({ fallback, children }: PropsWithChildren<SuspenseProps>) => {
  const isMounted = useIsMounted();

  if (isMounted) return <Suspense fallback={fallback}>{children}</Suspense>;

  return fallback;
};
