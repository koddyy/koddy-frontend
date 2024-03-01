import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { Mentor } from "@/types/mentor";
import { userApi } from "../api";
import { useGetMeAsMentor } from "./useGetMeAsMentor";

export const useUpdateMentorProfile = () => {
  const { data: me } = useGetMeAsMentor();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      introduction,
      period,
      schedules,
      profileImageFile,
    }: Pick<Mentor, "introduction" | "period" | "schedules"> & {
      profileImageFile?: File;
    }) => {
      if (profileImageFile) {
        const { preSignedUrl, uploadFileUrl } = await fileApi.getPresignedUrl(
          profileImageFile.name
        );
        await fileApi.uploadImageFile({ preSignedUrl, file: profileImageFile });

        return await userApi.patchMentorProfile({
          introduction: introduction ?? me?.introduction,
          period: period ?? me?.period,
          schedules: schedules ?? me?.schedules,
          profileImageUrl: uploadFileUrl,
        });
      }
      return userApi.patchMentorProfile({
        introduction: introduction ?? me?.introduction,
        period: period ?? me?.period,
        schedules: schedules ?? me?.schedules,
        profileImageUrl: me?.profileImageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
