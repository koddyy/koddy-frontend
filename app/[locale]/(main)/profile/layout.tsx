"use client";

import { NavigationBar } from "@/app/components/NavigationBar";
import { useRouter } from "@/libs/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      <div className="absolute inset-0 z-10 h-[240px] bg-dimmed-gradient" />
      {children}
    </>
  );
};

export default Layout;
