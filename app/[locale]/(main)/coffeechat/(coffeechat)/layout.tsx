"use client";

import { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
  mentee: ReactNode;
  mentor: ReactNode;
  guest: ReactNode;
}

const Layout = ({ children, mentee, mentor, guest }: Props) => {
  const { isPending, isAuthenticated, me } = useAuth();

  return (
    <>
      <Header />
      {children}
      {me?.role === "mentee" && mentee}
      {me?.role === "mentor" && mentor}
      {!isPending && !isAuthenticated && guest}
    </>
  );
};

export default Layout;
