import { useRef, useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";

export const ProfileImageStep = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<File>();

  console.log(profileImage);
  return (
    <>
      <div className="headline-1 mb-[36px]">
        프로필 사진을
        <br />
        등록해 주세요
      </div>
      <div className="flex flex-col items-center gap-[12px]">
        <ProfileImageUpload
          className="h-[120px] w-[120px] rounded-full"
          ref={fileInputRef}
          onChange={(e) => setProfileImage(e.target.files?.[0])}
        />
        <button
          className="label-bold w-[80px] rounded-[8px] border border-gray-400 py-[8px]"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          수정
        </button>
      </div>
      <BottomButton type="button" disabled={!profileImage}>
        다음
      </BottomButton>
    </>
  );
};
