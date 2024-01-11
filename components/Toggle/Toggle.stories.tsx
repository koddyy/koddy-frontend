import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Toggle, ToggleProps } from "./Toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    pressed: true,
  },
  argTypes: {
    pressed: {
      control: "boolean",
    },
    variant: {
      control: "radio",
      options: ["solid", "surface", "outline"],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledToggle = ({ pressed, ...args }: ToggleProps) => {
  const [isPressed, setIsPressed] = useState(pressed);

  useEffect(() => {
    setIsPressed(pressed);
  }, [pressed]);

  return (
    <Toggle {...args} pressed={isPressed} onChangePressed={() => setIsPressed((prev) => !prev)}>
      toggle
    </Toggle>
  );
};

export const Primary: Story = {
  render: (args: ToggleProps) => <ControlledToggle {...args} />,
};
