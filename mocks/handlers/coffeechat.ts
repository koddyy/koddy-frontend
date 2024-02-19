import { delay, http, HttpResponse, PathParams } from "msw";
import {
  PostCoffeeChatFromMentorToMenteeRequest,
  PostZoomMeetingLinkResponse,
} from "@/apis/coffeechat/types";
import {
  appliedCoffeeChatList,
  coffeeChatList,
  depreactedCoffeeChatList,
  suggestedCoffeeChatList,
} from "../fixture/coffeechat";
import { menteeList, mentorList } from "../fixture/user";

export const handlers = [
  http.get("/api/oauth/access/:provider", async ({ params }) => {
    await delay(1500);

    const provider = params.provider;

    return HttpResponse.json(
      { result: `/login/${provider}?code=mock-code&state=mock-state` },
      { status: 200 }
    );
  }),

  http.post<PathParams, PostZoomMeetingLinkResponse>(
    "/api/oauth/zoom/meetings",
    async ({ request }) => {
      const { topic } = await request.json();

      await delay(1500);

      return HttpResponse.json(
        {
          id: "123456789",
          hostEmail: "mentor1@gmail.com",
          topic,
          joinUrl: "https://us05web.zoom.us/mock-url",
          duration: 60,
        },
        { status: 200 }
      );
    }
  ),

  http.post<PathParams, PostCoffeeChatFromMentorToMenteeRequest>(
    "/api/coffeechats/suggest",
    async ({ request }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { menteeId, suggestReason } = await request.json();
      await delay(1500);

      return HttpResponse.json({ coffeeChatId: 1 }, { status: 200 });
    }
  ),

  http.get("/api/mentees/applied-coffeechats", async ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") ?? 3);
    const result = appliedCoffeeChatList.slice(0, limit);

    await delay(1500);

    return HttpResponse.json(
      {
        result,
        totalCount: appliedCoffeeChatList.length,
        hasNext: true,
      },
      { status: 200 }
    );
  }),

  http.get("/api/mentors/suggested-coffeechats", async ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") ?? 3);
    const result = suggestedCoffeeChatList.slice(0, limit);

    await delay(1500);

    return HttpResponse.json(
      {
        result,
        totalCount: suggestedCoffeeChatList.length,
        hasNext: true,
      },
      { status: 200 }
    );
  }),

  http.get("/api/coffeechats/me/category-counts", async () => {
    await delay(1500);

    return HttpResponse.json(
      {
        suggest: 2,
        waiting: 3,
        scheduled: 0,
        passed: 1,
      },
      { status: 200 }
    );
  }),

  http.get("/api/coffeechats/me/schedules", async ({ request }) => {
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const status = url.searchParams.get("status");

    await delay(1500);

    return HttpResponse.json(
      {
        result:
          role === "mentor"
            ? menteeList.map((v) => ({ ...v, status }))
            : mentorList.map((v) => ({ ...v, status })),
        hasNext: false,
      },
      { status: 200 }
    );
  }),

  http.get("/api/coffeechats/:id", async ({ params }) => {
    const role = new URL(window.location.href).searchParams.get("role");

    const id = Number(params.id);

    if (role === "mentor") {
      const coffeeChat = coffeeChatList.find((v) => v.id === id);

      if (!coffeeChat) return new HttpResponse(null, { status: 404 });

      return HttpResponse.json(
        {
          mentee: menteeList[0],
          coffeeChat,
        },
        { status: 200 }
      );
    } else {
      const coffeeChat = coffeeChatList.find((v) => v.id === id);

      if (!coffeeChat) return new HttpResponse(null, { status: 404 });

      return HttpResponse.json(
        {
          mentor: mentorList[0],
          coffeeChat,
        },
        { status: 200 }
      );
    }
  }),

  /** deprecated */
  http.get("/api/application", async () => {
    await delay(1500);

    return HttpResponse.json(
      {
        data: depreactedCoffeeChatList.filter(
          ({ status }) => status === "CANCEL" || status === "DONE"
        ),
      },
      { status: 200 }
    );
  }),

  http.get("/api/application/new", async () => {
    await delay(1500);

    return HttpResponse.json(
      {
        data: depreactedCoffeeChatList.filter(
          ({ status }) => status === "AGREE" || status === "REQUEST" || status === "SUGGEST"
        ),
      },
      { status: 200 }
    );
  }),

  http.get("/api/application/:id", async ({ params }) => {
    await delay(1500);

    return HttpResponse.json(
      { data: depreactedCoffeeChatList.find(({ applicationId }) => applicationId === params.id) },
      { status: 200 }
    );
  }),

  // http.post<PathParams, PostCoffeeChatRequest>("/api/application", async ({ request }) => {
  //   const { mentor: mentorId, mentee: menteeId, ...coffeechat } = await request.json();

  //   const mentor = mentorList.find(({ userId }) => userId === mentorId);
  //   const mentee = menteeList.find(({ userId }) => userId === menteeId);

  //   if (!mentor || !mentee) return new HttpResponse(null, { status: 400 });

  //   const newApplicationId = (Number(depreactedCoffeeChatList.at(-1)?.applicationId) ?? 0) + 1;
  //   const role = new URL(window.location.href).searchParams.get("role");

  //   depreactedCoffeeChatList.push({
  //     applicationId: String(newApplicationId),
  //     mentor,
  //     mentee,
  //     status: role === "mentor" ? "SUGGEST" : "REQUEST",
  //     ...coffeechat,
  //   });

  //   await delay(1500);

  //   return new HttpResponse(null, { status: 201 });
  // }),

  // http.patch<PathParams, PatchCoffeeChatStatusRequest>("/api/application", async ({ request }) => {
  //   const coffeechat = await request.json();

  //   const idx = depreactedCoffeeChatList.findIndex(
  //     ({ applicationId }) => applicationId === coffeechat.applicationId
  //   );

  //   await delay(1500);

  //   if (idx === -1) {
  //     return new HttpResponse(null, { status: 404 });
  //   }

  //   return new HttpResponse(null, { status: 204 });
  // }),
];
