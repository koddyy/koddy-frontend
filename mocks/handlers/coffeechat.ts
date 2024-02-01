import { delay, http, HttpResponse } from "msw";
import {
  appliedCoffeeChatList,
  depreactedCoffeeChatList,
  suggestedCoffeeChatList,
} from "../fixture/coffeechat";

export const handlers = [
  http.post("/api/coffeechats/suggest/:menteeId", async () => {
    await delay(1500);

    return HttpResponse.json({ coffeeChatId: 1 }, { status: 200 });
  }),

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
