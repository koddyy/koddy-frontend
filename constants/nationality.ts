export type Nationality = "한국" | "미국" | "일본" | "중국" | "베트남" | "Others";

export const NationalityOptions: Nationality[] = [
  "한국",
  "미국",
  "일본",
  "중국",
  "베트남",
  "Others",
];

export const NationalityImage: Record<Nationality, string> = {
  한국: "@/assets/south_korea.svg",
  미국: "@/assets/united_states.svg",
  일본: "@/assets/japan.svg",
  중국: "@/assets/china.svg",
  베트남: "@assets/vietnam.svg",
  Others: "",
};
