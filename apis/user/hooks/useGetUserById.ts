import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => userApi.getUserById(id),
  });
};
