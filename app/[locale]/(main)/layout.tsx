import { CSSProperties } from "react";
import { BottomNavigation } from "@/app/components/BottomNavigation/BottomNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

export default Layout;
