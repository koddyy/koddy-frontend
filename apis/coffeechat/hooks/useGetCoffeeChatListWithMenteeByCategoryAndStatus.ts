import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "../api";
import { GetCoffeeChatListRequest } from "../types";

export const useGetCoffeeChatListWithMenteeByCategoryAndStatus = ({
  page,
  category,
  status,
}: GetCoffeeChatListRequest) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["coffeeChat", "list", { category, status }],
    queryFn: ({ pageParam }) =>
      coffeeChatApi.getCoffeeChatListWithMenteeByCategoryAndStatus({
        page: pageParam,
        category,
        status,
      }),
    initialPageParam: page,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.hasNext ? lastPageParam + 1 : null),
    select: (data) => data.pages.map(({ result }) => result).flat(),
  });
};
