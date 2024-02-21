import { useQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

const useGetCoffeeChatById = (id: number) => {
  return useQuery({
    queryKey: ["coffeeChat", id],
    queryFn: () => coffeeChatApi.getCoffeeChatById(id),
    refetchOnWindowFocus: false,
  });
};

export default useGetCoffeeChatById;
