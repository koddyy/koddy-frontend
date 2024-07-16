import { cva, VariantProps } from "cva";
import { ChangeEvent, ComponentPropsWithRef, PropsWithChildren } from "react";
import Checked from "@/assets/checkboxes_checked.svg";
import Unchecked from "@/assets/checkboxes_unchecked.svg";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import { cn } from "@/utils/cn";
import { FormOptions } from "../FormControl/FormControl.type";

export const CheckboxVariants = cva(
  "body-2 rounded-[10px] border border-gray-300 px-[13px] py-[11px] [&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:text-gray-300",
  {
    variants: {
      variant: {
        solid:
          "[&:has(input:checked)]:border-primary [&:has(input:checked)]:bg-primary [&:has(input:checked)]:font-bold [&:has(input:checked)]:text-white",
        surface: "[&:has(input:checked)]:border-primary [&:has(input:checked)]:bg-[#DCFEEB]",
        outline: "[&:has(input:checked)]:border-primary",
      },
    },
  }
);

export interface CheckboxProps
  extends ComponentPropsWithRef<"input">,
    FormOptions,
    VariantProps<typeof CheckboxVariants> {
  className?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  className,
  checked,
  onChange,
  variant,
  children,
  ...props
}: PropsWithChildren<CheckboxProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasError, ...rest } = useFormControl(props);

  const defaultStyle = !variant;

  return (
    <label
      className={cn(
        defaultStyle ? "inline-flex items-center gap-1" : CheckboxVariants({ variant }),
        className
      )}
    >
      <input
        className="appearance-none"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      {defaultStyle && <span>{checked ? <Checked /> : <Unchecked />}</span>}
      {children}
    </label>
  );
};
