import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api";

export const useGetMentorById = (MentorId: number) => {
  return useQuery({
    queryKey: ["mentor", MentorId],
    queryFn: () => userApi.getMentorById(MentorId),
  });
};
