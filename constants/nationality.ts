import { NationCode } from "@/types/user";
import { getEntries } from "@/utils/object";

export type Nationality = NationCode | "ETC";

export const NationalityText: Record<Nationality, string> = {
  KR: "한국",
  EN: "미국",
  JP: "일본",
  CN: "중국",
  VN: "베트남",
  ETC: "Others",
};

export const NationalityOptions = getEntries(NationalityText);

export const NationalityImage: Record<Nationality, string> = {
  KR: "/images/south_korea.png",
  EN: "/images/united_states.png",
  JP: "/images/japan.png",
  CN: "/images/china.png",
  VN: "/images/vietnam.png",
  ETC: "",
};
