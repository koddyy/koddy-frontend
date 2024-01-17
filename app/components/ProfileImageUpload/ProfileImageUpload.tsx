import { ChangeEvent, ComponentProps, forwardRef, useRef } from "react";
import Camera from "@/assets/camera.svg";
import { useImagePreview } from "@/hooks/useImagePreview";
import { Role } from "@/types/user";
import { cn } from "@/utils/cn";

interface ProfileImageUploadProps extends ComponentProps<"input"> {
  imageUrl?: string;
  isEditable?: boolean;
  role?: Role;
}

export const ProfileImageUpload = forwardRef<HTMLInputElement, ProfileImageUploadProps>(
  ({ imageUrl, isEditable = false, role, onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { previewImage, onChangeImage } = useImagePreview();

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      const file = e.target.files?.[0];
      if (file) onChangeImage(file);
    };

    const defaultImageUrl =
      role === "mentor" ? "/images/empty_mentor.svg" : "/images/empty_mentee.svg";

    return (
      <div className="flex flex-col items-center gap-3">
        <label htmlFor="profile-image" className="hidden">
          프로필 이미지 등록
        </label>
        <input
          className="hidden"
          id="profile-image"
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          ref={(e) => {
            if (typeof ref === "function") ref(e);
            else if (ref) ref.current = e;
            inputRef.current = e;
          }}
          {...props}
        />
        <div className="relative">
          <img
            className={cn(
              "h-[108px] w-[108px] rounded-xl border border-gray-200 bg-gray-100 object-contain p-[7px]",
              previewImage && "object-cover p-0"
            )}
            src={imageUrl || previewImage || defaultImageUrl}
          />
          {isEditable && (
            <button
              aria-label="프로필 이미지 등록하기"
              className="absolute bottom-[-4px] right-[-4px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-400"
              onClick={() => inputRef?.current?.click()}
            >
              <Camera />
            </button>
          )}
        </div>
      </div>
    );
  }
);

ProfileImageUpload.displayName = "ProfileImageUpload";
