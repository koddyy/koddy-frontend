import { cn } from "@/utils/cn";
import { Radio, RadioProps } from "./Radio";

interface RadioGroupProps extends Omit<RadioProps, "value"> {
  name: string;
  values: string[];
  onChangeValue: (value: string) => void;
  direction?: "vertical" | "horizontal";
}

export const RadioGroup = ({
  name,
  values,
  onChangeValue,
  direction,
  ...props
}: RadioGroupProps) => {
  return (
    <div className={cn("flex gap-[14px]", direction === "vertical" && "flex-col")}>
      {values.map((value) => (
        <Radio
          key={value}
          name={name}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
          {...props}
        />
      ))}
    </div>
  );
};
