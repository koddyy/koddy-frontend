import { LanguageCode } from "@/types/user";

export const languageCodeText: Record<LanguageCode, string> = {
  KR: "한국어",
  EN: "영어",
  CN: "중국어",
  JP: "일본어",
  VN: "베트남어",
};

export const languagesOptions = Object.entries(languageCodeText) as Array<[LanguageCode, string]>;
