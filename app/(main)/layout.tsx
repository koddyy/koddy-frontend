import { CSSProperties } from "react";
import { BottomNavigation } from "@/app/components/BottomNavigation/BottomNavigation";
import PrivateRoute from "@/app/components/PrivateRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <div
        className="pb-[calc(var(--bottom-navigation-height)+1.5rem)]"
        style={
          {
            ["--bottom-navigation-height"]: "3.625rem",
          } as CSSProperties
        }
      >
        {children}
        <BottomNavigation />
      </div>
    </PrivateRoute>
  );
};

export default Layout;
