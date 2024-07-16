import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/Input";
import { FormCaption, FormControl, FormErrorMessage, FormLabel } from "./FormControl";

const meta = {
  title: "Components/FormControl",
  component: FormControl,
  tags: ["autodocs"],
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Label</FormLabel>
      <Input />
      <FormCaption>Caption</FormCaption>
      <FormErrorMessage>Error</FormErrorMessage>
    </FormControl>
  ),
};
