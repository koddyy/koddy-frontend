import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { useUploadImageFile } from "@/apis/file/hook/useUploadImageFile";
import { MentorInfoForm } from "@/features/user/ui/MentorInfoForm";
import { userApi } from "../api";

export const useUpdateMentorInfo = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadImageFile } = useUploadImageFile();

  return useMutation({
    mutationFn: async ({
      profileImageFile,
      profileImageUrl,
      ...rest
    }: MentorInfoForm & { profileImageUrl?: string }) => {
      if (profileImageFile) {
        const { preSignedUrl, uploadFileUrl } = await fileApi.getPresignedUrl(
          profileImageFile.name
        );
        await uploadImageFile({ preSignedUrl, file: profileImageFile });

        return await userApi.patchMentorInfo({ profileImageUrl: uploadFileUrl, ...rest });
      }

      return userApi.patchMentorInfo({ profileImageUrl, ...rest });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
