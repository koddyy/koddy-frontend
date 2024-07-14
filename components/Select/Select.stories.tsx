/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TriangleDown from "@/assets/triangle-down.svg";
import { CoffeeChatTypeIcon, CoffeeChatTypeLabel, Meeting } from "@/constants/coffeechat";
import { Select, SelectProps as Props } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type SelectProps<T extends string | number = string> = Props<T, false>;

const ControlledSelect = (args: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChangeValue = (value: string) => {
    setSelectedValue(value);
  };

  return <Select {...args} value={selectedValue} onChangeValue={handleChangeValue} />;
};

export const Controlled: StoryObj<typeof Select<string>> = {
  render: (args: SelectProps) => <ControlledSelect {...args} />,
  args: {
    options: ["Korea", "US", "Japen", "France", "Germany"],
    placeholder: "국적을 선택해 주세요",
    icon: TriangleDown,
  },
};

const CustomValueSelect = (args: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChangeValue = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Select
      {...args}
      value={selectedValue}
      onChangeValue={handleChangeValue}
      renderValue={(value) => (
        <div className="flex gap-[6px]">
          <span className="body-2-bold">selected option</span>
          <span className="body-2 text-gray-300">|</span>
          <span className="body-2-bold">{value}</span>
        </div>
      )}
    />
  );
};

export const CustomValue: StoryObj<typeof Select<string>> = {
  render: (args: SelectProps) => <CustomValueSelect {...args} />,
  args: {
    options: ["option1", "option2", "option3", "option4", "option5"],
    placeholder: "placeholder",
  },
};

const CustomOptionSelect = (args: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<Meeting>();

  return (
    <Select
      {...args}
      options={["zoom", "google"]}
      value={selectedValue}
      onChangeValue={(value) => setSelectedValue(value)}
      renderOption={(value) => {
        const Icon = CoffeeChatTypeIcon[value];
        return (
          <div className="flex gap-[6px] py-[8px]">
            {Icon && <Icon />}
            {CoffeeChatTypeLabel[value]}
          </div>
        );
      }}
    />
  );
};

export const CustomOption: StoryObj<typeof Select<string>> = {
  render: (args: SelectProps) => <CustomOptionSelect {...args} />,
  args: {},
};

export const MultiSelect: StoryObj<typeof Select<string, true>> = {
  render: (args: Props<string, true>) => {
    const [values, setValues] = useState(["option1"]);

    return <Select {...args} multiple value={values} onChangeValue={setValues} />;
  },
  args: {
    options: ["option1", "option2", "option3", "option4", "option5"],
    placeholder: "select options...",
  },
};
