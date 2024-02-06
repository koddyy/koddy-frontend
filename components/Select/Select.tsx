import { ElementType, PropsWithChildren, ReactNode, useState } from "react";
import ArrowDown from "@/assets/arrow_down.svg";
import { FormOptions } from "@/components/FormControl/FormControl.type";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

export interface SelectProps<T = string> extends FormOptions {
  className?: string;
  options: T[];
  value?: T;
  onChangeValue?: (value: T) => void;
  placeholder?: string;
  renderValue?: (value?: T) => ReactNode;
  renderOption?: (value: T) => ReactNode;
  rightContent?: ElementType;
  dropdownClassName?: string;
}

export const Select = <T extends string | number>({
  className,
  options,
  value,
  onChangeValue,
  placeholder,
  renderValue,
  renderOption,
  rightContent: RightContent = ArrowDown,
  dropdownClassName,
  ...props
}: PropsWithChildren<SelectProps<T>>) => {
  const { hasError } = useFormControl(props);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  const handleChange = (value: T) => {
    onChangeValue?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative grow" ref={ref}>
      <button
        className={cn(
          "body-1 flex w-full appearance-none items-center rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem] outline-none focus-within:border-primary",
          hasError && "border border-danger focus-within:border-danger",
          className
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {renderValue ? (
          renderValue(value) || <span className="text-gray-400">{placeholder}</span>
        ) : (
          <span className={cn(!value && "text-gray-400")}>{value || placeholder}</span>
        )}
        {RightContent && <RightContent className="ml-auto" width={18} height={18} />}
      </button>
      {isOpen && (
        <ul
          className={cn(
            "absolute top-14 z-dropdown max-h-[12rem] w-full overflow-y-scroll rounded-[0.625rem] border border-gray-300 bg-white shadow-md",
            dropdownClassName
          )}
        >
          {options.map((value) => (
            <li
              key={value}
              className="body-3 rounded-[0.625rem] px-3 py-2 hover:bg-gray-100"
              onClick={() => handleChange(value)}
            >
              {renderOption ? renderOption(value) : value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
