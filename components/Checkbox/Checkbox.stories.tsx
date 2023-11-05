import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    children: <span>✔️</span>,
  },
};

const CheckboxGroup = () => {
  const [isChecked, setIsChecked] = useState<Array<boolean>>(new Array(7).fill(false));

  return (
    <div className="flex gap-2">
      {["월", "화", "수", "목", "금", "토", "일"].map((value, i) => (
        <Checkbox
          className="px-[0.8125rem] py-[0.6875rem]"
          key={i}
          checked={isChecked[i]}
          onChangeChecked={() => {
            setIsChecked((prev) => {
              const cloned = [...prev];
              cloned[i] = !cloned[i];
              return cloned;
            });
          }}
        >
          {value}
        </Checkbox>
      ))}
    </div>
  );
};

export const Group: StoryObj<typeof CheckboxGroup> = {
  render: () => <CheckboxGroup />,
};
