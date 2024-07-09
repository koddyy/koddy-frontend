import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import { isNil } from "@/utils/typeUtils";
import { useFormControl } from "../FormControl/FormControlContext";
import { useRadioContext } from "./Radio.context";

export interface RadioProps extends Omit<ComponentPropsWithoutRef<"input">, "name" | "onChange"> {
  value: string;
}

export const Radio = ({ className, value, children, ...props }: PropsWithChildren<RadioProps>) => {
  const { name, value: selectedValue, onChangeValue } = useRadioContext();
  const {
    required,
    disabled,
    readOnly,
    "aria-describedby": ariaDesribedby,
  } = useFormControl(props);

  return (
    <label className="body-1 flex items-center gap-[6px]" htmlFor={value}>
      <input
        className={cn("radio-input", className)}
        id={value}
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
