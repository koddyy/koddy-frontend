import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";

export const getDescription = (
  user:
    | Pick<Mentor, "role" | "school" | "major" | "enteredIn">
    | Pick<Mentee, "role" | "interestSchool" | "interestMajor">
) => {
  if (user.role === "mentor") {
    const { school, major, enteredIn } = user;
    return `${school} ${major} ${enteredIn}학번`;
  } else if (user.role === "mentee") {
    const { interestSchool, interestMajor } = user;
    return `관심 : ${interestSchool}, ${interestMajor}`;
  }

  return "";
};
