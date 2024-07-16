import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio, RadioVariantsProps } from "./Radio";
import { RadioGroup, RadioGroupProps } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const OPTIONS = ["option1", "option2", "option3"];

const ControlledRadioGroup = ({ variant, ...args }: RadioGroupProps & RadioVariantsProps) => {
  const [value, setValue] = useState(OPTIONS[0]);

  return (
    <RadioGroup {...args} name={`options-${variant}`} value={value} onChangeValue={setValue}>
      <div className="flex gap-[14px]">
        {OPTIONS.map((option) => (
          <Radio key={option} value={option} variant={variant}>
            {option}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
};

export const Primary: Story = {
  render: (args) => (
    <div className="flex flex-col gap-[46px]">
      <ControlledRadioGroup {...args} />
      <ControlledRadioGroup variant="solid" {...args} />
      <ControlledRadioGroup variant="surface" {...args} />
      <ControlledRadioGroup variant="outline" {...args} />
    </div>
  ),
};
