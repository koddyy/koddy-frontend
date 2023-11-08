import { BottomNavigation } from "@/app/_components/BottomNavigation/BottomNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
};

export default Layout;
