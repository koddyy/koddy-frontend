import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export interface CheckboxProps {
  className?: string;
  value?: string;
  checked: boolean;
  onChangeChecked: () => void;
}

export const Checkbox = ({
  className,
  checked,
  onChangeChecked,
  children,
}: PropsWithChildren<CheckboxProps>) => {
  return (
    <div
      className={cn(
        "inline-block rounded-[0.625rem] border border-gray-300 ",
        checked && "border-primary bg-[#EAFAF1] text-primary",
        className
      )}
      onClick={onChangeChecked}
    >
      <input className="appearance-none" type="checkbox" checked={checked} />
      {children}
    </div>
  );
};
