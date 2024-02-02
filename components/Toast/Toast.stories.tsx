import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Toast } from "./Toast";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";

const meta: Meta<typeof Toast> = {
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Primary: Story = {
  args: {
    content: "Toast",
  },
};

export const Usage: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { showToast } = useToast();

    return (
      <Button size="sm" fullWidth={false} onClick={() => showToast({ content: "Toast" })}>
        Open Toast
      </Button>
    );
  },
};
