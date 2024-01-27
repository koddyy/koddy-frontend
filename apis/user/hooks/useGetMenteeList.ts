import { useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { GetMenteeListRequest } from "../types";

export const useGetMenteeList = ({ page, nationalities, languages }: GetMenteeListRequest) => {
  return useSuspenseQuery({
    queryKey: ["getMenteeList", { page, nationalities, languages }],
    queryFn: () => userApi.getMenteeList({ page, nationalities, languages }),
  });
};
