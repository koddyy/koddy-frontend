"use client";

import Back from "@/assets/back.svg";
import { cn } from "@/utils/cn";

interface NavigationBarProps {
  className?: string;
  title?: string;
  onClickGoback?: () => void;
}

export const NavigationBar = ({ className, title, onClickGoback }: NavigationBarProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between border-b border-b-gray-200 px-5 py-[0.875rem]",
        className
      )}
    >
      {onClickGoback && (
        <button onClick={onClickGoback}>
          <Back />
        </button>
      )}
      {title && <h1 className="subheading-bold absolute left-1/2 -translate-x-1/2">{title}</h1>}
    </div>
  );
};
