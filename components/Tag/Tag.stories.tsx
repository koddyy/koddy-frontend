import type { Meta, StoryObj } from "@storybook/react";
import Close from "@/assets/close.svg";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Tag",
  },
};

export const WithRightContent: Story = {
  args: {
    rightContent: <Close className="h-[18px] w-[18px]" />,
    children: "Tag",
  },
};
