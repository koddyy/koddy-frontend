import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ProfileImageUploadProps {
  register?: UseFormRegisterReturn;
  watchImage?: FileList;
}

export const ProfileImageUpload = ({ register, watchImage }: ProfileImageUploadProps) => {
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageFile(URL.createObjectURL(watchImage[0]));
    }
  }, [watchImage]);

  return (
    <div className="flex flex-col items-center gap-2">
      <input className="invisible" id="image" type="file" accept="image/*" {...register} />
      <div>
        <img
          className="h-[7.5rem] w-[7.5rem] rounded-xl object-cover"
          src={imageFile ? imageFile : "/images/profile.png"}
        />
      </div>
      <label htmlFor="image" className="label-bold rounded-[0.625rem] border border-gray-300 p-2">
        {!imageFile ? "프로필 등록하기" : "프로필 수정하기"}
      </label>
    </div>
  );
};
