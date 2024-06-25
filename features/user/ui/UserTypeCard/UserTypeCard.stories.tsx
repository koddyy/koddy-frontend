import type { Meta } from "@storybook/react";
import { UserTypeCard } from "./UserTypeCard";

const meta = {
  title: "user/UserTypeCard",
  component: UserTypeCard,
} satisfies Meta<typeof UserTypeCard>;

export default meta;

export const Default = {
  args: {
    type: "mentor",
  },
};
