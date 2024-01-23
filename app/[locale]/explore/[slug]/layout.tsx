import { notFound } from "next/navigation";
import { CSSProperties } from "react";
import { BottomNavigation } from "@/app/components/BottomNavigation/BottomNavigation";

const Layout = ({ params, children }: { params: { slug: string }; children: React.ReactNode }) => {
  const slug = params.slug;

  if (!["mentor", "mentee"].includes(slug)) return notFound();

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
      <BottomNavigation baseUrl={`explore/${slug}`} />
    </div>
  );
};

export default Layout;
