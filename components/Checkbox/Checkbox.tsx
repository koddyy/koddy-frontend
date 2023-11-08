import { ChangeEvent, PropsWithChildren } from "react";
import Checked from "@/assets/checkboxes_checked.svg";
import Unchecked from "@/assets/checkboxes_unchecked.svg";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import { cn } from "@/utils/cn";

export interface CheckboxProps {
  className?: string;
  id?: string;
  value?: string;
  checked?: boolean;
  onChangeChecked?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  className,
  value,
  checked,
  onChangeChecked,
  children,
  ...props
}: PropsWithChildren<CheckboxProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasError } = useFormControl(props);

  return (
    <label className={cn("flex items-center gap-1", className)}>
      <input
        className="peer appearance-none"
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChangeChecked}
      />
      <span>{checked ? <Checked /> : <Unchecked />}</span>
      {children}
    </label>
  );
};
