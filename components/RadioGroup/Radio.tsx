import { VariantProps } from "cva";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import { isNil } from "@/utils/typeUtils";
import { CheckboxVariants } from "../Checkbox";
import { useFormControl } from "../FormControl/FormControlContext";
import { useRadioContext } from "./Radio.context";

export const RadioVariants = CheckboxVariants;
export type RadioVariantsProps = VariantProps<typeof RadioVariants>;

export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<"input">, "name" | "onChange">,
    RadioVariantsProps {
  value: string;
}

export const Radio = ({
  className,
  value,
  variant,
  children,
  ...props
}: PropsWithChildren<RadioProps>) => {
  const { name, value: selectedValue, onChangeValue } = useRadioContext();
  const {
    required,
    disabled,
    readOnly,
    "aria-describedby": ariaDesribedby,
  } = useFormControl(props);

  const defaultStyle = !variant;

  return (
    <label
      className={cn(
        defaultStyle ? "body-1 flex items-center gap-[6px]" : RadioVariants({ variant }),
        className
      )}
    >
      <input
        className={cn("appearance-none", defaultStyle && "radio-input")}
        type="radio"
        name={name}
        value={value}
        onChange={(e) => onChangeValue?.(e.target.value)}
        checked={isNil(selectedValue) ? undefined : value === selectedValue}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-describedby={ariaDesribedby}
        {...props}
      />
      {children}
    </label>
  );
};
