import { http, HttpResponse } from "msw";
import { mentee, menteeList, mentor, mentorList, userList } from "../fixture/user";

export const handlers = [
  http.get("/api/users/me", () => {
    const role = new URL(window.location.href).searchParams.get("role");
    return HttpResponse.json({ data: role === "mentor" ? mentor : mentee }, { status: 200 });
  }),

  http.get("/api/users/mentor", () => {
    return HttpResponse.json({ data: mentorList }, { status: 200 });
  }),

  http.get("/api/users/mentee", () => {
    return HttpResponse.json({ data: menteeList }, { status: 200 });
  }),

  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json(
      { data: userList.find(({ userId }) => userId === params.id) },
      { status: 200 }
    );
  }),
];
