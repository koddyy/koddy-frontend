import { useMutation } from "@tanstack/react-query";
import { fileApi } from "../api";

export const useUploadImageFile = () => {
  return useMutation({
    mutationFn: fileApi.uploadImageFile,
  });
};
