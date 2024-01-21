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
  한국: "/images/south_korea.png",
  미국: "/images/united_states.png",
  일본: "/images/japan.png",
  중국: "/images/china.png",
  베트남: "/images/vietnam.png",
  Others: "",
};
