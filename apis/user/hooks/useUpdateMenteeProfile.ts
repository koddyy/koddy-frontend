import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { Mentee } from "@/types/mentee";
import { userApi } from "../api";

export const useUpdateMenteeProfile = () => {
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

        return await userApi.patchMenteeProfile({ introduction, profileImageUrl: uploadFileUrl });
      }

      return userApi.patchMenteeProfile({ introduction });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
