import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { Mentee } from "@/types/mentee";
import { userApi } from "../api";
import { useGetMe } from "./useGetMe";

export const useUpdateMenteeProfile = () => {
  const { data: me } = useGetMe();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      introduction,
      profileImageFile,
    }: Pick<Mentee, "introduction"> & { profileImageFile?: File }) => {
      if (profileImageFile) {
        const { preSignedUrl, uploadFileUrl } = await fileApi.getPresignedUrl(
          profileImageFile.name
        );

        await fileApi.uploadImageFile({ preSignedUrl, file: profileImageFile });

        return await userApi.patchMenteeProfile({
          introduction: introduction ?? me?.introduction,
          profileImageUrl: uploadFileUrl,
        });
      }

      return userApi.patchMenteeProfile({
        introduction: introduction ?? me?.introduction,
        profileImageUrl: me?.profileImageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
