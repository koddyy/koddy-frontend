"use client";

import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";
import Home from "@/assets/icon_home.svg";
import My from "@/assets/icon_my.svg";
import Reservation from "@/assets/icon_reservation.svg";
import { cn } from "@/utils/cn";

const NAVIGATION_LINK = [
  { segment: "", icon: Home, label: "home" },
  { segment: "coffeechat", icon: Reservation, label: "calendar" },
  { segment: "mypage", icon: My, label: "mypage" },
] as const;

export const BottomNavigation = () => {
  const t = useTranslations("BottomNavigation");

  const searchParams = useSearchParams();
  const currentSegment = useSelectedLayoutSegment() ?? "";

  return (
    <div className="fixed bottom-0 left-1/2 z-header flex h-[3.625rem] w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white text-gray-500">
      {NAVIGATION_LINK.map(({ segment, icon: Icon, label }, i) => {
        const isCurrentSegment = segment === currentSegment;

        return (
          <Link
            key={i}
            className={cn(
              "flex grow flex-col items-center gap-[2px] pb-3 pt-2",
              isCurrentSegment ? "text-primary" : "text-gray-400"
            )}
            href={
              searchParams.get("explore") ? `/${segment}?${searchParams.toString()}` : `/${segment}`
            }
          >
            <span>
              <Icon />
            </span>
            <span className="label-bold">{t(`${label}`)}</span>
          </Link>
        );
      })}
    </div>
  );
};
