import { useId, useState } from "react";
import { SelectProps, SelectValue } from ".";

type UseSelectProps<T extends string | number, Multiple extends boolean> = Pick<
  SelectProps<T, Multiple>,
  "value" | "onChangeValue" | "multiple"
>;

export const useSelect = <T extends string | number, Multiple extends boolean>({
  value,
  onChangeValue,
  multiple,
}: UseSelectProps<T, Multiple>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownId = useId();

  const closeDropdown = () => {
    setIsOpenDropdown(false);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const isSelectedValue = (option: T) => {
    return multiple ? (value as T[]).includes(option) : value === option;
  };

  const handleChangeSingleValue = (option: T) => {
    onChangeValue?.(option as SelectValue<T, Multiple>);
    closeDropdown();
  };

  const handleChangeMultiValues = (option: T) => {
    if (isSelectedValue(option)) {
      onChangeValue?.((value as T[]).filter((v) => v !== option) as SelectValue<T, Multiple>);
    } else {
      onChangeValue?.([...(value as T[]), option] as SelectValue<T, Multiple>);
    }
  };

  const triggerProps = {
    role: "combobox",
    "aria-controls": dropdownId,
    "aria-expanded": isOpenDropdown,
    "aria-haspopup": "listbox" as const,
  };

  const listBoxProps = {
    role: "listbox",
    id: dropdownId,
    tabIndex: -1,
    "aria-multiselectable": multiple,
  };

  const getOptionProps = (option: T) => ({
    role: "option",
    "aria-selected": isSelectedValue(option),
  });

  return {
    isOpenDropdown,
    closeDropdown,
    toggleDropdown,
    handleChangeSingleValue,
    handleChangeMultiValues,
    triggerProps,
    listBoxProps,
    getOptionProps,
  };
};
