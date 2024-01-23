import type { Meta } from "@storybook/react";
import { UserTypeCard } from "./UserTypeCard";

const meta = {
  title: "App/signup/UserTypeCard",
  component: UserTypeCard,
} satisfies Meta<typeof UserTypeCard>;

export default meta;

export const Default = {
  args: {
    type: "mentor",
  },
};
