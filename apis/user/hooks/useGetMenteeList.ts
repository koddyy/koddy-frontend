import { useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useGetMenteeList = () => {
  return useSuspenseQuery({
    queryKey: ["getMenteeList"],
    queryFn: userApi.getMenteeList,
  });
};
