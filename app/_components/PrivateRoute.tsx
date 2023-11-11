"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: me, isLoading } = useGetMe();

  const isLogggedIn = Boolean(me);

  useEffect(() => {
    if (!isLoading && !isLogggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLogggedIn, router]);

  return <>{children}</>;
};

export default PrivateRoute;
