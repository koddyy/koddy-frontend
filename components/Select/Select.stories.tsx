import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TriangleDown from "@/assets/triangle-down.svg";
import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

const options = ["Korea", "US", "Japen", "France", "Germany"];

const ControlledSelect = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChangeValue = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Select
      options={options}
      value={selectedValue}
      onChangeValue={handleChangeValue}
      placeholder="국적을 선택해 주세요"
      rightContent={TriangleDown}
    />
  );
};

export const Controlled: StoryObj<typeof ControlledSelect> = {
  render: () => <ControlledSelect />,
};
