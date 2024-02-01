import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { appliedCoffeeChatList } from "@/mocks/fixture/coffeechat";
import { NewAppliedCoffeeChatList } from "./NewAppliedCoffeeChatList";

const meta: Meta<typeof NewAppliedCoffeeChatList> = {
  title: "App/home/NewAppliedCoffeeChatList",
  component: NewAppliedCoffeeChatList,
};

export default meta;
type Story = StoryObj<typeof NewAppliedCoffeeChatList>;

export const Maximum: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/mentees/applied-coffeechats", ({ request }) => {
          const url = new URL(request.url);
          const limit = Number(url.searchParams.get("limit") ?? 3);

          return HttpResponse.json(
            {
              result: appliedCoffeeChatList.slice(0, limit),
              totalCount: appliedCoffeeChatList.length,
              hasNext: true,
            },
            { status: 200 }
          );
        }),
      ],
    },
  },
};

export const Minimum: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/mentees/applied-coffeechats", () => {
          return HttpResponse.json(
            { result: appliedCoffeeChatList.slice(0, 1), totalCount: 1, hasNext: false },
            { status: 200 }
          );
        }),
      ],
    },
  },
};
