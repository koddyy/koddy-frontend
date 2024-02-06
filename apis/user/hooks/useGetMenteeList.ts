import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { GetMenteeListRequest } from "../types";

export const useGetMenteeList = (
  initialPageParam: number,
  { nationalities, languages }: Pick<GetMenteeListRequest, "nationalities" | "languages">
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["getMentorList", { nationalities, languages }],
    queryFn: ({ pageParam }) =>
      userApi.getMenteeList({ page: pageParam, nationalities, languages }),
    initialPageParam,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.hasNext ? lastPageParam + 1 : null),
    select: (data) => data.pages.map(({ result }) => result).flat(),
  });
};
