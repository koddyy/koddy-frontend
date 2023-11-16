import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { convertAvailableTimes } from "@/utils/availableTimes";

export const useGetMyAvailableTimes = () => {
  const { data: me } = useGetMe();

  if (!me || me.mentorYn === "N") return { startTime: "", endTime: "", weeks: [] };

  return convertAvailableTimes(me.availableTimes);
};
