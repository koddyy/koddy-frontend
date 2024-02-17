import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { Mentor } from "@/types/mentor";
import { userApi } from "../api";

export const useUpdateMentorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      introduction,
      period,
      schedules,
      profileImageFile,
    }: Pick<Mentor, "introduction" | "period" | "schedules"> & { profileImageFile?: File }) => {
      if (profileImageFile) {
        const { preSignedUrl, uploadFileUrl } = await fileApi.getPresignedUrl(
          profileImageFile.name
        );
        await fileApi.uploadImageFile({ preSignedUrl, file: profileImageFile });

        return await userApi.patchMentorProfile({
          introduction,
          period,
          schedules,
          profileImageUrl: uploadFileUrl,
        });
      }
      return userApi.patchMentorProfile({
        introduction,
        period,
        schedules,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
