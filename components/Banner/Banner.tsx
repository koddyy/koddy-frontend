import { PropsWithChildren } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import { Link } from "@/libs/navigation";

interface BannerProps {
  href: string;
  actionText?: string;
}

export const Banner = ({ href, actionText, children }: PropsWithChildren<BannerProps>) => {
  return (
    <Link href={href}>
      <div className="rounded-xl bg-primary-gradient p-[18px] text-white">
        {children}
        {actionText && (
          <div className="body-3-bold flex justify-end">
            {actionText}
            <ArrowRight />
          </div>
        )}
      </div>
    </Link>
  );
};
