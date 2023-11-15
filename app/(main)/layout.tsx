import { BottomNavigation } from "@/app/components/BottomNavigation/BottomNavigation";
import PrivateRoute from "@/app/components/PrivateRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      {children}
      <BottomNavigation />
    </PrivateRoute>
  );
};

export default Layout;
