"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { useMenteeInfoFormStore, useMentorInfoFormStore } from "@/features/user/store/profile";
import { MenteeInfoForm } from "@/features/user/ui/MenteeInfoForm";
import { MentorInfoForm } from "@/features/user/ui/MentorInfoForm";
import { useRouter } from "@/libs/navigation";

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const clearMentorInfoForm = useMentorInfoFormStore((state) => state.clear);
  const clearMenteeInfoForm = useMenteeInfoFormStore((state) => state.clear);

  return (
    <>
      <NavigationBar
        title="회원 정보 수정"
        titleFontWeight="regular"
        onClickGoback={() => {
          if (me?.role === "mentor") clearMentorInfoForm();
          else if (me?.role === "mentee") clearMenteeInfoForm();
          router.back();
        }}
      />
      {me?.role === "mentor" && <MentorInfoForm />}
      {me?.role === "mentee" && <MenteeInfoForm />}
    </>
  );
};

export default Page;
