import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { BottomSheet, ButtonArea } from "./BottomSheet";

const meta = {
  title: "Components/BottomSheet",
  component: BottomSheet,
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
  render: (args) => (
    <BottomSheet {...args}>
      <div>content area</div>
    </BottomSheet>
  ),
};

export const WithButton: Story = {
  args: {
    onClose: () => {},
  },
  render: (args) => (
    <BottomSheet {...args}>
      <div>content area</div>
      <ButtonArea>
        <Button>Button1</Button>
      </ButtonArea>
    </BottomSheet>
  ),
};

export const WithTwoButton: Story = {
  args: {
    onClose: () => {},
  },
  render: (args) => (
    <BottomSheet {...args}>
      <div>content area</div>
      <ButtonArea>
        <Button variant="outline">Button1</Button>
        <Button>Button2</Button>
      </ButtonArea>
    </BottomSheet>
  ),
};
