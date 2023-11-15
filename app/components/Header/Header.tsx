import Link from "next/link";
import Bell from "@/assets/icon_bell.svg";
import Logo from "@/assets/logo_small_letter.svg";

export const Header = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-header flex h-[3.25rem] items-center justify-between border-b border-gray-200 bg-white px-5">
      <Logo />
      <Link href="/notification">
        <Bell />
      </Link>
    </div>
  );
};
