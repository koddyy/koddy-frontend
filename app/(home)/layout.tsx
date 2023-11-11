import { BottomNavigation } from "@/app/_components/BottomNavigation/BottomNavigation";
import PrivateRoute from "@/app/_components/PrivateRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      {children}
      <BottomNavigation />
    </PrivateRoute>
  );
};

export default Layout;
