import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  parameters: {
    backgrounds: { default: "dark" },
  },
  argTypes: {
    defaultDate: {
      control: "date",
    },
    minDate: {
      control: "date",
    },
    maxDate: {
      control: "date",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="h-40">
        <DatePicker {...args} />
      </div>
    );
  },
};
