import { useState } from "react";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import { SelectProps } from "@/components/Select";
import { cn } from "@/utils/cn";

export interface MultiSelectProps extends Omit<SelectProps, "value" | "onChangeValue"> {
  values: Set<string>;
  onAddValues: (value: string) => void;
  onDeleteValues: (value: string) => void;
}

export const MultiSelect = ({
  className,
  options,
  values,
  onAddValues,
  onDeleteValues,
  placeholder,
  rightContent: RightContent,
  ...props
}: MultiSelectProps) => {
  const { hasError } = useFormControl(props);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddValues = (value: string) => {
    onAddValues?.(value);
  };

  const handleDeleteValues = (value: string) => {
    onDeleteValues?.(value);
  };

  return (
    <div className="relative text-base text-gray-400">
      <button
        className={cn(
          "flex w-full appearance-none items-center rounded-[0.625rem] border border-gray-300 px-5 py-[0.6875rem] outline-none focus-within:ring-1 focus-within:ring-gray-400 focus-within:ring-offset-1",
          hasError && "border-[#f87171]",
          className
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {values.size === 0 ? (
          <span>{placeholder}</span>
        ) : (
          <ul className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {[...values].map((value) => (
              <li
                key={value}
                className="rounded-md border border-primary bg-[#EAFAF1] px-[0.625rem] py-[0.375rem] text-xs font-medium text-primary"
                onClick={() => handleDeleteValues(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        )}
        {RightContent && <RightContent className="ml-auto" />}
      </button>
      {isOpen && (
        <ul className="absolute top-14 w-full rounded-[0.625rem] border border-gray-300">
          {options.map((value) => (
            <li
              key={value}
              className="cursor-pointer px-5 py-1 hover:bg-gray-100"
              onClick={() => handleAddValues(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
