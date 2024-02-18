import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "../api";
import { GetCoffeeChatListRequest } from "../types";

export const useGetCoffeeChatListWithMenteeByCategoryAndStatus = ({
  page,
  category,
  detail,
}: GetCoffeeChatListRequest) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["coffeeChat", "list", { category, detail }],
    queryFn: ({ pageParam }) =>
      coffeeChatApi.getCoffeeChatListWithMenteeByCategoryAndStatus({
        page: pageParam,
        category,
        detail,
      }),
    initialPageParam: page,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.hasNext ? lastPageParam + 1 : null),
    select: (data) => data.pages.map(({ result }) => result).flat(),
  });
};
