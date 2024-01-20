import { QueryClient, useMutation } from "@tanstack/react-query";
import { fileApi } from "@/apis/file/api";
import { useUploadImageFile } from "@/apis/file/hook/useUploadImageFile";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { userApi } from "../api";

export const useUpdateMenteeInfo = () => {
  const queryClient = new QueryClient();
  const { mutateAsync: uploadImageFile } = useUploadImageFile();

  return useMutation({
    mutationFn: async ({ profileImageFile, ...rest }: UpdateMenteeInfoForm) => {
      const { preSignedUrl, uploadFileUrl } = await fileApi.getPresignedUrl(profileImageFile.name);

      await uploadImageFile({ preSignedUrl, file: profileImageFile });

      return await userApi.patchMenteeInfo({ profileImageUrl: uploadFileUrl, ...rest });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
