"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetMe } from "@/api/user/hooks/useGetMe";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: me, isLoading } = useGetMe();

  const isLogggedIn = !isLoading && Boolean(me);

  useEffect(() => {
    if (!isLogggedIn) {
      router.push("/login");
    }
  }, [isLogggedIn, router]);

  return <>{children}</>;
};

export default PrivateRoute;
