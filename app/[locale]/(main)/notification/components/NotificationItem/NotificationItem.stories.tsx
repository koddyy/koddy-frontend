import type { Meta, StoryObj } from "@storybook/react";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { NotificationItem } from "./NotificationItem";

const meta: Meta<typeof NotificationItem> = {
  title: "App/notification/NotificationItem",
  component: NotificationItem,
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Primary: Story = {
  args: {
    profileImageUrl: DefaultProfileImageUrl.mentor,
    description: (
      <div className="body-2">
        <span className="body-2-bold">user_name</span>님과의 커피챗이 2024년 x월 xx일로
        예정되었습니다.
      </div>
    ),
    date: "2024.01.01",
  },
};
