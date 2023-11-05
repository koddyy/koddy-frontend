import { ElementType, PropsWithChildren, useState } from "react";
import { cn } from "@/utils/cn";

export interface SelectProps {
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
  rightContent: RightContent,
}: PropsWithChildren<SelectProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    onChangeValue?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative text-base text-gray-400">
      <button
        className={cn(
          "flex w-full appearance-none items-center rounded-[0.625rem] border border-gray-300 px-5 py-[0.6875rem] outline-none focus-within:ring-1 focus-within:ring-gray-400 focus-within:ring-offset-1",
          className
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value || placeholder}</span>
        {RightContent && <RightContent className="ml-auto" />}
      </button>
      {isOpen && (
        <ul className="absolute top-14 w-full rounded-[0.625rem] border border-gray-300">
          {options.map((value) => (
            <li
              key={value}
              className="px-5 py-1 hover:bg-gray-100"
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
