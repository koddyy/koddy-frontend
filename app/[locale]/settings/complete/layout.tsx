"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
  mentee: ReactNode;
  mentor: ReactNode;
}

const Layout = ({ children, mentee, mentor }: Props) => {
  const { me } = useAuth();

  return (
    <>
      {children}
      {me?.role === "mentee" && mentee}
      {me?.role === "mentor" && mentor}
    </>
  );
};

export default Layout;
