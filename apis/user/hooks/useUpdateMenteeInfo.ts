import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { useUploadImageFile } from "@/apis/file/hook/useUploadImageFile";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { userApi } from "../api";

export const useUpdateMenteeInfo = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadImageFile } = useUploadImageFile();

  return useMutation({
    mutationFn: async ({
      profileImageFile,
      profileImageUrl,
      ...rest
    }: UpdateMenteeInfoForm & { profileImageFile?: File }) => {
      if (profileImageFile) {
        const { preSignedUrl, uploadFileUrl } = await fileApi.getPresignedUrl(
          profileImageFile.name
        );
        await uploadImageFile({ preSignedUrl, file: profileImageFile });

        return await userApi.patchMenteeInfo({ profileImageUrl: uploadFileUrl, ...rest });
      }

      return await userApi.patchMenteeInfo({ profileImageUrl, ...rest });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
