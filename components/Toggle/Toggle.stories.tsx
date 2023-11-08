import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledToggle = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Toggle pressed={isPressed} onChangePressed={() => setIsPressed((prev) => !prev)}>
      toggle
    </Toggle>
  );
};

export const Controlled: Story = {
  render: () => <ControlledToggle />,
};
