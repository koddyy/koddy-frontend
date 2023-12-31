import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Role } from "@/types/user";
import { cn } from "@/utils/cn";

interface ProfileImageUploadProps {
  register?: UseFormRegisterReturn;
  watchImage?: FileList;
  role?: Role;
}

export const ProfileImageUpload = ({ register, watchImage, role }: ProfileImageUploadProps) => {
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageFile(URL.createObjectURL(watchImage[0]));
    }
  }, [watchImage]);

  const defaultImageUrl =
    role === "mentor" ? "/images/empty_mentor.svg" : "/images/empty_mentee.svg";

  return (
    <div className="flex flex-col items-center gap-3">
      <input className="hidden" id="image" type="file" accept="image/*" {...register} />
      <div>
        <img
          className={cn(
            "h-[7.5rem] w-[7.5rem] rounded-xl border border-gray-200 bg-gray-100 object-contain p-[0.3rem]",
            imageFile && "object-cover p-0"
          )}
          src={imageFile || defaultImageUrl}
        />
      </div>
      <label htmlFor="image" className="label-bold rounded-[0.625rem] border border-gray-300 p-2">
        {!imageFile ? "프로필 등록하기" : "프로필 수정하기"}
      </label>
    </div>
  );
};
