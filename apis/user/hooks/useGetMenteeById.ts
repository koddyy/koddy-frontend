import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api";

export const useGetMenteeById = (menteeId: number) => {
  return useQuery({
    queryKey: ["mentee", menteeId],
    queryFn: () => userApi.getMenteeById(menteeId),
  });
};
