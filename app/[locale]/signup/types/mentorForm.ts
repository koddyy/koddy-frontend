import { Mentor } from "@/types/mentor";

export type SignupForm = Pick<Mentor, "school" | "enteredIn" | "major" | "languages">;
