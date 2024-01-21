import { delay, http, HttpResponse } from "msw";
import { mentee, menteeList, mentor, mentorList, userList } from "../fixture/user";

export const handlers = [
  http.get("/api/members/me", async () => {
    const role = new URL(window.location.href).searchParams.get("role");

    return HttpResponse.json(role === "mentor" ? mentor : mentee, { status: 200 });
  }),

  http.get("/api/users/mentor", async () => {
    await delay(1500);

    return HttpResponse.json(mentorList, { status: 200 });
  }),

  http.get("/api/users/mentee", async () => {
    await delay(1500);

    return HttpResponse.json(menteeList, { status: 200 });
  }),

  http.get("/api/users/:id", async ({ params }) => {
    await delay(1500);

    return HttpResponse.json(
      userList.find(({ id }) => id === Number(params.id)),
      { status: 200 }
    );
  }),
];
