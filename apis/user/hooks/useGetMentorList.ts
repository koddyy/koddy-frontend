import { useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { GetMentorListRequest } from "../types";

export const useGetMentorList = ({ page, languages }: GetMentorListRequest) => {
  return useSuspenseQuery({
    queryKey: ["getMentorList"],
    queryFn: () => userApi.getMentorList({ page, languages }),
  });
};
