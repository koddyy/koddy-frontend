import { QueryClient, useMutation } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { useUploadImageFile } from "@/apis/file/hook/useUploadImageFile";
import { UpdateMentorInfoForm } from "@/types/mentor";
import { userApi } from "../api";

export const useUpdateMentorInfo = () => {
  const queryClient = new QueryClient();
  const { mutateAsync: uploadImageFile } = useUploadImageFile();

  return useMutation({
    mutationFn: async ({ profileImageFile, ...rest }: UpdateMentorInfoForm) => {
      const { preSignedUrl, uploadFileUrl } = await fileApi.getPresignedUrl(profileImageFile.name);

      await uploadImageFile({ preSignedUrl, file: profileImageFile });

      return await userApi.patchMentorInfo({ profileImageUrl: uploadFileUrl, ...rest });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
