import { NationCode } from "@/types/user";

export const NationCodeText: Record<NationCode, string> = {
  KR: "한국어",
  EN: "영어",
  CN: "중국어",
  JP: "일본어",
  VN: "베트남어",
};

export const languagesOptions = Object.entries(NationCodeText) as Array<[NationCode, string]>;
