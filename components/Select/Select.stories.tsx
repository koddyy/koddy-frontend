import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TriangleDown from "@/assets/triangle-down.svg";
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

  return <Select value={selectedValue} onChangeValue={handleChangeValue} {...args} />;
};

export const Controlled: StoryObj<typeof Select<string>> = {
  render: (args: SelectProps) => <ControlledSelect {...args} />,
  args: {
    options: ["Korea", "US", "Japen", "France", "Germany"],
    placeholder: "국적을 선택해 주세요",
    rightContent: TriangleDown,
  },
};
