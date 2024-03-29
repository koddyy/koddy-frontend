import Bell from "@/assets/icon_bell.svg";
import Logo from "@/assets/logo_small_letter.svg";
import { Link } from "@/libs/navigation";

interface HeaderProps {
  rightContent?: React.ReactNode;
}

export const Header = ({ rightContent }: HeaderProps) => {
  return (
    <div className="sticky inset-x-0 top-0 z-header flex h-[3.25rem] items-center justify-between border-b border-gray-200 bg-white px-5">
      <Logo />
      {rightContent ?? (
        <Link href="/notification">
          <Bell width={32} height={32} />
        </Link>
      )}
    </div>
  );
};
