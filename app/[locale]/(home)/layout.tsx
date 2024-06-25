"use client";

import { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { SwitchExploreUserButton } from "@/features/user/ui/SwitchExploreUserButton";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
  mentee: ReactNode;
  mentor: ReactNode;
  unauthenticated: ReactNode;
}

const Layout = ({ children, mentee, mentor, unauthenticated }: Props) => {
  const { isPending, isAuthenticated, me } = useAuth();

  return (
    <>
      <Header
        rightContent={!isPending ? !isAuthenticated ? <SwitchExploreUserButton /> : null : <></>}
      />
      {children}
      {me?.role === "mentee" && mentee}
      {me?.role === "mentor" && mentor}
      {!isPending && !isAuthenticated && unauthenticated}
    </>
  );
};

export default Layout;
