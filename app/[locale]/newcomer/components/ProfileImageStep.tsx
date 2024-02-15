import { useRef, useState } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { BottomButton } from "@/app/components/BottomButton";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";

interface ProfileImageStepProps {
  onSubmitForm: (profileImageFile: File) => void;
}

export const ProfileImageStep = ({ onSubmitForm }: ProfileImageStepProps) => {
  const { data: me } = useGetMe();
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  console.log(profileImageFile);
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
          role={me?.role}
          ref={fileInputRef}
          imageUrl={profileImageFile ? URL.createObjectURL(profileImageFile) : me?.profileImageUrl}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setProfileImageFile(file);
          }}
        />
        <button
          className="label-bold w-[80px] rounded-[8px] border border-gray-400 py-[8px]"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          수정
        </button>
      </div>
      <BottomButton
        disabled={!profileImageFile}
        onClick={() => {
          if (profileImageFile) {
            onSubmitForm(profileImageFile);
          }
        }}
      >
        다음
      </BottomButton>
    </>
  );
};
