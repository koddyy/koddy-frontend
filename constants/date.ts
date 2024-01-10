export const DAYS = ["월", "화", "수", "목", "금", "토", "일"] as const;

export const TIMES = new Array(24).fill(0).reduce((acc, _, i) => {
  const HH = String(i).padStart(2, "0");
  return [...acc, `${HH}:00`, `${HH}:30`];
}, []);
