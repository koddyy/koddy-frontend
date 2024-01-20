import { useState } from "react";

export const useImagePreview = () => {
  const [previewImage, setPreviewImage] = useState("");

  const onChangeImage = (file: File) => {
    setPreviewImage(URL.createObjectURL(file));
  };

  return { previewImage, onChangeImage };
};
