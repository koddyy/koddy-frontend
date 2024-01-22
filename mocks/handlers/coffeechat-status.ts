import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.patch("/api/coffeechats/suggested/pending/:coffeeChatId", async () => {
    await delay(1500);

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch("/api/coffeechats/suggested/reject/:coffeeChatId", async () => {
    await delay(1500);

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch("/api/coffeechats/pending/approve/:coffeeChatId", async () => {
    await delay(1500);

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch("/api/coffeechats/pending/reject/:coffeeChatId", async () => {
    await delay(1500);

    return new HttpResponse(null, { status: 204 });
  }),
];
