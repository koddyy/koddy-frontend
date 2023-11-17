"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Event from "@/assets/event.svg";
import Home from "@/assets/home.svg";
import Person from "@/assets/person.svg";
import { cn } from "@/utils/cn";

const NAVIGATION_LINK = [
  { segment: "", icon: Home, label: "홈" },
  { segment: "coffeechat", icon: Event, label: "예약" },
  { segment: "mypage", icon: Person, label: "마이" },
];

export const BottomNavigation = () => {
  const currentSegment = useSelectedLayoutSegment() ?? "";

  return (
    <div className="fixed bottom-0 left-1/2 z-overlay flex h-[3.625rem] w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white text-gray-500">
      {NAVIGATION_LINK.map(({ segment, icon: Icon, label }, i) => {
        const isCurrentSegment = segment === currentSegment;

        return (
          <Link
            key={i}
            className={cn(
              "flex grow flex-col items-center gap-[0.13rem] pb-3 pt-2",
              isCurrentSegment ? "text-gray-700" : "text-gray-500"
            )}
            href={`/${segment}`}
          >
            <span>
              <Icon />
            </span>
            <span className="label-bold">{label}</span>
          </Link>
        );
      })}
    </div>
  );
};
