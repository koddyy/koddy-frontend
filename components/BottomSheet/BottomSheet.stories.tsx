import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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
    isOpen: false,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex justify-center">
        <Button fullWidth={false} onClick={() => setIsOpen((prev) => !prev)}>
          open
        </Button>
        <BottomSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="m-auto h-[300px]">content area</div>
        </BottomSheet>
      </div>
    );
  },
};

export const WithButton: Story = {
  args: {
    isOpen: true,
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
    isOpen: true,
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
