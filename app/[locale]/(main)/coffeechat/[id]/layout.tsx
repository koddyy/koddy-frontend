"use client";

import { ReactNode } from "react";
import { NavigationBar } from "@/app/components/NavigationBar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/libs/navigation";

interface Props {
  children: ReactNode;
  mentee: ReactNode;
  mentor: ReactNode;
}

const Layout = ({ children, mentee, mentor }: Props) => {
  const router = useRouter();
  const { me } = useAuth();

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {children}
      {me?.role === "mentee" && mentee}
      {me?.role === "mentor" && mentor}
    </>
  );
};

export default Layout;
