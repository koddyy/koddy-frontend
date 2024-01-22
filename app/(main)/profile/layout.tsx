"use client";

import { useRouter } from "next/navigation";
import { NavigationBar } from "@/app/components/NavigationBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {children}
    </>
  );
};

export default Layout;
