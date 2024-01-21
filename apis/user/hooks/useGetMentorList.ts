import { useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useGetMentorList = () => {
  return useSuspenseQuery({
    queryKey: ["getMentorList"],
    queryFn: userApi.getMentorList,
  });
};
