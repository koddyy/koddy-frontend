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
      {children}
    </>
  );
};

export default Layout;
