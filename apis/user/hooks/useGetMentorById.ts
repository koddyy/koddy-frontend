import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => userApi.getUserById(id),
    select: (data) => data.data,
  });
};
