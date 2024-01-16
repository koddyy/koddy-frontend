import Link from "next/link";
import { PropsWithChildren } from "react";
import ArrowRight from "@/assets/arrow-right.svg";

interface BannerProps {
  href?: string;
  actionText?: string;
}

export const Banner = ({ href, actionText, children }: PropsWithChildren<BannerProps>) => {
  return (
    <div className="rounded-xl bg-primary-gradient p-[18px] text-white">
      {children}
      {href && (
        <div className="flex justify-end">
          <Link className="body-3-bold flex" href={href}>
            {actionText}
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
};
