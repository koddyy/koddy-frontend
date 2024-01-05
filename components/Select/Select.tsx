import { ElementType, PropsWithChildren, useState } from "react";
import ArrowDown from "@/assets/arrow_down.svg";
import { FormOptions } from "@/components/FormControl/FormControl.type";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

export interface SelectProps extends FormOptions {
  className?: string;
  options: string[];
  value?: string;
  onChangeValue?: (value: string) => void;
  placeholder?: string;
  rightContent?: ElementType;
}

export const Select = ({
  className,
  options,
  value = "",
  onChangeValue,
  placeholder,
  rightContent: RightContent = ArrowDown,
  ...props
}: PropsWithChildren<SelectProps>) => {
  const { hasError } = useFormControl(props);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  const handleChange = (value: string) => {
    onChangeValue?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className={cn(
          "body-1 flex w-full appearance-none items-center rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem] outline-none focus-within:border-primary",
          hasError && "border border-danger focus-within:border-danger",
          className
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={cn(!value && "text-gray-400")}>{value || placeholder}</span>
        {RightContent && <RightContent className="ml-auto" />}
      </button>
      {isOpen && (
        <ul className="absolute top-14 z-dropdown max-h-[12rem] w-full overflow-y-scroll rounded-[0.625rem] border border-gray-300 bg-white shadow-md">
          {options.map((value) => (
            <li
              key={value}
              className="body-3 rounded-[0.625rem] px-3 py-2 hover:bg-gray-100"
              onClick={() => handleChange(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
