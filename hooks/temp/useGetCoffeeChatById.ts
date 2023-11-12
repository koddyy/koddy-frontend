import { useMemo } from "react";
import useGetCoffeeChatList from "@/apis/coffeechat/hooks/useGetCoffeeChatList";
import useGetNewCoffeeChatList from "@/apis/coffeechat/hooks/useGetNewCoffeeChatList";

export const useGetCoffeeChatById = (id: string) => {
  const { data: coffeeChatList } = useGetCoffeeChatList();
  const { data: newCoffeeChatList } = useGetNewCoffeeChatList();

  const coffeechat = useMemo(
    () =>
      coffeeChatList.concat(newCoffeeChatList).find(({ applicationId }) => id === applicationId),
    [id]
  );

  return { coffeechat };
};
