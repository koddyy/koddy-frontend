import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TriangleDown from "@/assets/triangle-down.svg";
import { MultiSelect } from "./MultiSelect";

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof MultiSelect>;

export default meta;

const options = ["한국어", "영어", "일본어", "불어", "독일어"];

const ControlledMultiSelect = () => {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  return (
    <MultiSelect
      options={options}
      values={selectedValues}
      onAddValues={(value) =>
        setSelectedValues((prev) => {
          const cloned = new Set(prev);
          cloned.add(value);
          return cloned;
        })
      }
      onDeleteValues={(value) =>
        setSelectedValues((prev) => {
          const cloned = new Set(prev);
          cloned.delete(value);
          return cloned;
        })
      }
      placeholder="국적을 선택해 주세요"
      rightContent={TriangleDown}
    />
  );
};

export const Controlled: StoryObj<typeof ControlledMultiSelect> = {
  render: () => <ControlledMultiSelect />,
};
