import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta = {
  title: "App/home/UserCard",
  component: UserCard,
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userId: "1",
    mentorYn: "Y",
    email: "",
    school: "",
    major: "",
    name: "Hường",
    introduce: "description",
    nationality: "베트남인",
    languages: [{ languageId: "KO" }, { languageId: "EN" }],
  },
};
