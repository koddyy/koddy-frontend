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
    children: "option",
  },
};

const CheckboxGroup = () => {
  const [isChecked, setIsChecked] = useState<Array<boolean>>(new Array(3).fill(false));

  return (
    <div className="flex flex-col gap-2">
      {["option1", "option2", "option3"].map((value, i) => (
        <Checkbox
          key={i}
          value={value}
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
