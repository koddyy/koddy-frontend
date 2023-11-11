"use client";

import Back from "@/assets/back.svg";
import { cn } from "@/utils/cn";

interface NavigationBarProps {
  className?: string;
  title?: string;
  onClickGoback?: () => void;
  backButtonColor?: "default" | "white";
}

export const NavigationBar = ({
  className,
  title,
  onClickGoback,
  backButtonColor,
}: NavigationBarProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-header flex min-h-[3.25rem] w-full items-center justify-between border-b border-b-gray-200 bg-white px-5 py-[0.875rem]",
        className
      )}
    >
      {onClickGoback && (
        <button className={cn(backButtonColor === "white" && "text-white")} onClick={onClickGoback}>
          <Back />
        </button>
      )}
      {title && <h1 className="subheading-bold absolute left-1/2 -translate-x-1/2">{title}</h1>}
    </div>
  );
};
