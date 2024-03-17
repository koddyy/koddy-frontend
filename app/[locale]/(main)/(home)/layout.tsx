"use client";

import { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { SwitchExploreUserButton } from "./components/SwitchExploreUserButton";

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
