import axios from "axios";
import { apiInstance } from "../axios";
import { GetPresignedUrlResponse } from "./types";

export const fileApi = {
  getPresignedUrl: async (fileName: string) => {
    const response = await apiInstance.get<GetPresignedUrlResponse>(
      `/api/files/presigned/image?fileName=${fileName}`
    );
    return response.data;
  },

  uploadImageFile: ({ preSignedUrl, file }: { preSignedUrl: string; file: File }) => {
    return axios.put(preSignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  },
};
