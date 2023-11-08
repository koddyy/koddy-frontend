import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export interface ToggleProps {
  className?: string;
  pressed?: boolean;
  onChangePressed?: () => void;
}

export const Toggle = ({
  className,
  pressed,
  onChangePressed,
  children,
}: PropsWithChildren<ToggleProps>) => {
  return (
    <button
      className={cn(
        "rounded-[0.625rem] border border-gray-300 px-[0.8125rem] py-[0.6875rem]",
        pressed && "border-none bg-primary text-white",
        className
      )}
      onClick={onChangePressed}
    >
      {children}
    </button>
  );
};
