import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  value: string;
}

export const Radio = ({ className, value, ...props }: RadioProps) => {
  return (
    <label className="body-1 flex items-center gap-[6px]" htmlFor={value}>
      <input
        className={cn("radio-input", className)}
        id={value}
        type="radio"
        value={value}
        {...props}
      />
      {value}
    </label>
  );
};
