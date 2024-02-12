"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { useRouter } from "@/libs/navigation";
import { MenteeInfoForm } from "./components/MenteeInfoForm";
import { MentorInfoForm } from "./components/MentorInfoForm";
import { useMenteeInfoFormStore, useMentorInfoFormStore } from "./store";

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const clearMentorInfoForm = useMentorInfoFormStore((state) => state.clear);
  const clearMenteeInfoForm = useMenteeInfoFormStore((state) => state.clear);

  return (
    <>
      <NavigationBar
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
