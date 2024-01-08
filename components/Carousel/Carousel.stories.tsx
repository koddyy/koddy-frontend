import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  argTypes: {
    loop: { control: "boolean" },
  },
  args: {
    loop: true,
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Primary: Story = {
  render: (args) => (
    <Carousel {...args}>
      <div className="p-16 text-center">slide 1</div>
      <div className="p-16 text-center">slide 2</div>
      <div className="p-16 text-center">slide 3</div>
    </Carousel>
  ),
};
