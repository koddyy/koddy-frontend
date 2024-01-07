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
    mentorYn: "Y",
    userId: "1",
    name: "Hường",
    email: "",
    school: "OO대학교",
    major: "OO학부",
    grade: 0,
    nationality: "베트남인",
    languages: [{ languageId: "KR" }, { languageId: "EN" }],
    availableTimes: [],
  },
};

export const Mentee: Story = {
  args: {
    mentorYn: "N",
    userId: "1",
    name: "Hường",
    email: "",
    school: "OO대학교",
    major: "OO학부",
    nationality: "베트남인",
    languages: [{ languageId: "KR" }, { languageId: "EN" }],
  },
};
