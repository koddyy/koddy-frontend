import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useGetMentorById = (id: string) => {
  return useQuery({
    queryKey: ["getMentorById", id],
    queryFn: () => userApi.getMentorById(id),
    select: (data) => data.data,
  });
};
