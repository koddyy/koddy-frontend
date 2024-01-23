import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TriangleDown from "@/assets/triangle-down.svg";
import { CoffeeChatTypeIcon, CoffeeChatTypeLabel, Meeting } from "@/constants/coffeechat";
import { Select, SelectProps } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

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
    rightContent: TriangleDown,
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

const CustomOptionSelect = (args: SelectProps<Meeting>) => {
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

export const CustomOption: StoryObj<typeof Select<Meeting>> = {
  render: (args: SelectProps<Meeting>) => <CustomOptionSelect {...args} />,
  args: {},
};
