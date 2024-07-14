import { ElementType, PropsWithChildren, ReactNode } from "react";
import ArrowDown from "@/assets/arrow_down.svg";
import Close from "@/assets/close.svg";
import { FormOptions } from "@/components/FormControl/FormControl.type";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";
import { useSelect } from "./useSelect";

export type SelectValue<T, Multiple> = Multiple extends true ? T[] : T;

export interface SelectProps<T extends string | number, Multiple extends boolean>
  extends FormOptions {
  className?: string;
  options: T[];
  value?: SelectValue<T, Multiple>;
  onChangeValue?: (value: SelectValue<T, Multiple>) => void;
  placeholder?: string;
  renderValue?: (value: SelectValue<T, Multiple>) => ReactNode;
  renderOption?: (value: T) => ReactNode;
  multiple?: Multiple;
  icon?: ElementType;
  dropdownClassName?: string;
}

export const Select = <T extends string | number, Multiple extends boolean = false>({
  className,
  options,
  value,
  onChangeValue,
  placeholder,
  renderValue: renderValueProp,
  renderOption,
  multiple = false as Multiple,
  icon: SelectIcon = ArrowDown,
  dropdownClassName,
  ...props
}: PropsWithChildren<SelectProps<T, Multiple>>) => {
  const { hasError, readOnly, ...rest } = useFormControl(props);
  const {
    isOpenDropdown,
    closeDropdown,
    toggleDropdown,
    handleChangeSingleValue,
    handleChangeMultiValues,
    triggerProps,
    listBoxProps,
    getOptionProps,
  } = useSelect({
    value,
    onChangeValue,
    multiple,
  });
  const ref = useClickOutside(closeDropdown);

  const renderValue = (value: SelectValue<T, Multiple>) => {
    if (renderValueProp) return renderValueProp(value);

    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return null;

      return (
        <ul className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {value.map((v) => (
            <li
              key={v}
              className="label-bold flex items-center gap-[2px] rounded-md border border-primary bg-[#EAFAF1] py-[6px] pl-[10px] pr-[6px] text-primary"
              onClick={() => {
                toggleDropdown();
                handleChangeMultiValues(v);
              }}
            >
              {v}
              <Close width={15} height={15} role="presentation" aria-hidden="true" />
            </li>
          ))}
        </ul>
      );
    }

    return value;
  };

  return (
    <div className="relative grow" ref={ref}>
      <button
        className={cn(
          "body-1 flex h-[46px] w-full appearance-none items-center rounded-[10px] border border-gray-300 px-[18px] outline-none focus-within:border-primary",
          hasError && "border border-danger focus-within:border-danger",
          className
        )}
        type="button"
        onClick={() => {
          if (readOnly) return;
          toggleDropdown();
        }}
        {...triggerProps}
        {...rest}
      >
        {(value && renderValue(value)) || <span className="text-gray-400">{placeholder}</span>}
        {SelectIcon && (
          <SelectIcon
            className="ml-auto"
            width={18}
            height={18}
            role="presentation"
            aria-hidden="true"
          />
        )}
      </button>
      {isOpenDropdown && (
        <ul
          className={cn(
            "absolute top-14 z-dropdown max-h-[12rem] w-full overflow-y-scroll rounded-[0.625rem] border border-gray-300 bg-white shadow-md",
            dropdownClassName
          )}
          {...listBoxProps}
        >
          {options.map((option) => (
            <li
              key={option}
              className="body-3 rounded-[0.625rem] px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                if (multiple) {
                  handleChangeMultiValues(option);
                } else {
                  handleChangeSingleValue(option);
                }
              }}
              {...getOptionProps(option)}
            >
              {renderOption ? renderOption(option) : option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
