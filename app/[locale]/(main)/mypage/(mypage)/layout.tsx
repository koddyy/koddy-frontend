"use client";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { NavigationBar } from "@/app/components/NavigationBar";
import ThreeDots from "@/assets/three_dots.svg";
import { PATH } from "@/constants/path";
import { useAuth } from "@/hooks/useAuth";
import { Link, usePathname } from "@/libs/navigation";

interface Props {
  children: ReactNode;
  mentee: ReactNode;
  mentor: ReactNode;
  guest: ReactNode;
}

const Layout = ({ children, mentee, mentor, guest }: Props) => {
  const t = useTranslations("mypage");

  const pathname = usePathname();
  const { isPending, isAuthenticated, me } = useAuth();

  return (
    <>
      {pathname === PATH.MYPAGE && (
        <NavigationBar
          title={t("title")}
          rightContent={
            isAuthenticated && (
              <Link href={PATH.MYPAGE_ACCOUNT}>
                <ThreeDots />
              </Link>
            )
          }
        />
      )}
      {children}
      {me?.role === "mentee" && mentee}
      {me?.role === "mentor" && mentor}
      {!isPending && !isAuthenticated && guest}
    </>
  );
};

export default Layout;
