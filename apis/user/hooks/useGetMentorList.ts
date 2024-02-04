import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { GetMentorListRequest } from "../types";

export const useGetMentorList = (
  initialPageParam: number,
  { languages }: Pick<GetMentorListRequest, "languages">
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["getMentorList", { languages }],
    queryFn: ({ pageParam }) => userApi.getMentorList({ page: pageParam, languages }),
    initialPageParam,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.hasNext ? lastPageParam + 1 : null),
    select: (data) => data.pages.map(({ result }) => result).flat(),
  });
};
