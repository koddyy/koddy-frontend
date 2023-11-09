import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { BottomSheet, ButtonArea } from "./BottomSheet";

const meta = {
  title: "Components/BottomSheet",
  component: BottomSheet,
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClose: () => {},
  },
  render: (args) => (
    <BottomSheet {...args}>
      <div>content area</div>
      <ButtonArea>
        <Button>아니요</Button>
        <Button>네</Button>
      </ButtonArea>
    </BottomSheet>
  ),
};
