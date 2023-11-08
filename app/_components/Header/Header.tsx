import Link from "next/link";
import Bell from "@/assets/icon_bell.svg";
import Logo from "@/assets/logo_small_letter.svg";

export const Header = () => {
  return (
    <div className="sticky flex h-[3.25rem] items-center justify-between px-5">
      <Logo />
      <Link href="/notify">
        <Bell />
      </Link>
    </div>
  );
};
