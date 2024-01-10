import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const Controlled = () => {
  const [value, setValue] = useState("");

  return (
    <RadioGroup name="options" value={value} onChangeValue={setValue}>
      <Radio value="option1">option1</Radio>
      <Radio value="option2">option2</Radio>
    </RadioGroup>
  );
};

export const Primary: Story = {
  render: () => <Controlled />,
};
