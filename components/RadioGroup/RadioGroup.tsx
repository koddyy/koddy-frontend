import { PropsWithChildren, useMemo } from "react";
import { cn } from "@/utils/cn";
import { RadioContext, type RadioContextProps } from "./Radio.context";

export interface RadioGroupProps extends RadioContextProps {
  name: string;
  value: string;
  onChangeValue: (value: string) => void;
  direction?: "vertical" | "horizontal";
}

export const RadioGroup = ({
  name,
  value,
  onChangeValue,
  direction,
  children,
}: PropsWithChildren<RadioGroupProps>) => {
  const context = useMemo(() => ({ name, value, onChangeValue }), [name, value, onChangeValue]);
  return (
    <div className={cn("flex gap-[14px]", direction === "vertical" && "flex-col")}>
      <RadioContext.Provider value={context}>{children}</RadioContext.Provider>
    </div>
  );
};
