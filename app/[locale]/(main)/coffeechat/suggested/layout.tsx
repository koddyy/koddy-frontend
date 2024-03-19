"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("coffeechat");

  const router = useRouter();

  const { me } = useAuth();

  return (
    <>
      <NavigationBar
        title={me ? t(`suggested.${me.role}`) : ""}
        titleFontWeight="regular"
        onClickGoback={() => router.back()}
      />
      {children}
      {me?.role === "mentee" && mentee}
      {me?.role === "mentor" && mentor}
    </>
  );
};

export default Layout;
