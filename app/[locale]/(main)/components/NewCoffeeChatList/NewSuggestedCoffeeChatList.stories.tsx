import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { suggestedCoffeeChatList } from "@/mocks/fixture/coffeechat";
import { NewSuggestedCoffeeChatList } from "./NewSuggestedCoffeeChatList";

const meta: Meta<typeof NewSuggestedCoffeeChatList> = {
  title: "App/home/NewSuggestedCoffeeChatList",
  component: NewSuggestedCoffeeChatList,
};

export default meta;
type Story = StoryObj<typeof NewSuggestedCoffeeChatList>;

export const Maximum: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/mentors/suggested-coffeechats", ({ request }) => {
          const url = new URL(request.url);
          const limit = Number(url.searchParams.get("limit") ?? 3);

          return HttpResponse.json(
            {
              result: suggestedCoffeeChatList.slice(0, limit),
              totalCount: suggestedCoffeeChatList.length,
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
        http.get("/api/mentors/suggested-coffeechats", () => {
          return HttpResponse.json(
            { result: suggestedCoffeeChatList.slice(0, 1), totalCount: 1, hasNext: false },
            { status: 200 }
          );
        }),
      ],
    },
  },
};
