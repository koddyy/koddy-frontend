"use client";

import { BottomNavigation } from "@/app/components/BottomNavigation/BottomNavigation";
import { PATH } from "@/constants/path";
import { usePathname } from "@/libs/navigation";

const PATH_WITH_BOTTOM_NAVIGATION = [PATH.HOME, PATH.COFFEECHAT, PATH.MYPAGE, PATH.NOTIFICATION];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {children}
      {PATH_WITH_BOTTOM_NAVIGATION.includes(pathname) && (
        <>
          <div className="h-[82px]" />
          <BottomNavigation />
        </>
      )}
    </>
  );
};

export default Layout;
