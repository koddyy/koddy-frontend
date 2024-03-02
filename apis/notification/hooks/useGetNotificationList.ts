import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { notificationApi } from "../api";

export const useGetNotificationList = ({ page }: { page: number }) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["notification"],
    queryFn: ({ pageParam }) => notificationApi.getNotificationList({ page: pageParam }),
    initialPageParam: page,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.hasNext ? lastPageParam + 1 : null),
    select: (data) => data.pages.map(({ result }) => result).flat(),
  });
};
