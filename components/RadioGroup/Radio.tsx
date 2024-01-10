import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import { useRadioContext } from "./Radio.context";

export interface RadioProps extends Omit<ComponentPropsWithoutRef<"input">, "name" | "onChange"> {
  value: string;
}

export const Radio = ({ className, value, children, ...props }: PropsWithChildren<RadioProps>) => {
  const { name, value: selectedValue, onChangeValue } = useRadioContext();

  return (
    <label className="body-1 flex items-center gap-[6px]" htmlFor={value}>
      <input
        className={cn("radio-input", className)}
        id={value}
        type="radio"
        name={name}
        value={value}
        onChange={(e) => onChangeValue?.(e.target.value)}
        checked={value === selectedValue}
        {...props}
      />
      {children}
    </label>
  );
};
