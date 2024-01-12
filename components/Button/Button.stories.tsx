import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Button",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-2">
      <Button {...args} variant="solid">
        solid
      </Button>
      <Button {...args} variant="outline">
        outline
      </Button>
      <Button {...args} variant="ghost">
        ghost
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col items-start gap-2">
        <Button {...args} color="primary">
          primary
        </Button>
        <Button {...args} color="grayscale">
          grayscale
        </Button>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col items-start gap-2">
        <Button {...args} size="base" fullWidth={false}>
          base
        </Button>
        <Button {...args} size="sm" fullWidth={false}>
          sm
        </Button>
        <Button {...args} size="xs" fullWidth={false}>
          xs
        </Button>
      </div>
    );
  },
};
