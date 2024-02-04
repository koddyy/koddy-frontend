import { useQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

const useGetCoffeeChatById = (id: number) => {
  return useQuery({
    queryKey: ["getCoffeeChatById", id],
    queryFn: () => coffeeChatApi.getCoffeeChatById(id),
  });
};

export default useGetCoffeeChatById;
