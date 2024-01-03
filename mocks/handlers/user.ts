import { delay, http, HttpResponse } from "msw";
import { mentee, menteeList, mentor, mentorList, userList } from "../fixture/user";

export const handlers = [
  http.get("/api/users/me", async () => {
    const role = new URL(window.location.href).searchParams.get("role");

    return HttpResponse.json({ data: role === "mentor" ? mentor : mentee }, { status: 200 });
  }),

  http.get("/api/users/mentor", async () => {
    await delay(1500);

    return HttpResponse.json({ data: mentorList }, { status: 200 });
  }),

  http.get("/api/users/mentee", async () => {
    await delay(1500);

    return HttpResponse.json({ data: menteeList }, { status: 200 });
  }),

  http.get("/api/users/:id", async ({ params }) => {
    await delay(1500);

    return HttpResponse.json(
      { data: userList.find(({ userId }) => userId === params.id) },
      { status: 200 }
    );
  }),
];
