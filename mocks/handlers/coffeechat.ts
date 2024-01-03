import { delay, http, HttpResponse, PathParams } from "msw";
import { PatchCoffeeChatStatusRequest, PostCoffeeChatRequest } from "@/apis/coffeechat/types";
import { coffeechatList } from "../fixture/coffeechat";
import { menteeList, mentorList } from "../fixture/user";

export const handlers = [
  http.get("/api/application", async () => {
    await delay(1500);

    return HttpResponse.json(
      { data: coffeechatList.filter(({ status }) => status === "CANCEL" || status === "DONE") },
      { status: 200 }
    );
  }),

  http.get("/api/application/new", async () => {
    await delay(1500);

    return HttpResponse.json(
      {
        data: coffeechatList.filter(
          ({ status }) => status === "AGREE" || status === "REQUEST" || status === "SUGGEST"
        ),
      },
      { status: 200 }
    );
  }),

  http.get("/api/application/:id", async ({ params }) => {
    await delay(1500);

    return HttpResponse.json(
      { data: coffeechatList.find(({ applicationId }) => applicationId === params.id) },
      { status: 200 }
    );
  }),

  http.post<PathParams, PostCoffeeChatRequest>("/api/application", async ({ request }) => {
    const { mentor: mentorId, mentee: menteeId, ...coffeechat } = await request.json();

    const mentor = mentorList.find(({ userId }) => userId === mentorId);
    const mentee = menteeList.find(({ userId }) => userId === menteeId);

    if (!mentor || !mentee) return new HttpResponse(null, { status: 400 });

    const newApplicationId = (Number(coffeechatList.at(-1)?.applicationId) ?? 0) + 1;
    const role = new URL(window.location.href).searchParams.get("role");

    coffeechatList.push({
      applicationId: String(newApplicationId),
      mentor,
      mentee,
      status: role === "mentor" ? "SUGGEST" : "REQUEST",
      ...coffeechat,
    });

    await delay(1500);

    return new HttpResponse(null, { status: 201 });
  }),

  http.patch<PathParams, PatchCoffeeChatStatusRequest>("/api/application", async ({ request }) => {
    const coffeechat = await request.json();

    const idx = coffeechatList.findIndex(
      ({ applicationId }) => applicationId === coffeechat.applicationId
    );

    await delay(1500);

    if (idx === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
