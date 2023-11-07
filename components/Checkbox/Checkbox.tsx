import { PropsWithChildren } from "react";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import { cn } from "@/utils/cn";

export interface CheckboxProps {
  className?: string;
  value?: string;
  checked: boolean;
  onChangeChecked: () => void;
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
    <div
      className={cn(
        "inline-block rounded-[0.625rem] border border-gray-300 ",
        checked && "border-primary bg-[#EAFAF1] text-primary",
        className
      )}
      onClick={onChangeChecked}
    >
      <input className="appearance-none" type="checkbox" value={value} checked={checked} />
      {children}
    </div>
  );
};
