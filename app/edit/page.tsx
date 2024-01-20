"use client";

import { useRouter } from "next/navigation";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { MenteeInfoForm } from "./components/MenteeInfoForm";
import { MentorInfoForm } from "./components/MentorInfoForm";
import { useLanguageStore } from "./language/store";

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const { clear } = useLanguageStore();

  return (
    <>
      <NavigationBar
        onClickGoback={() => {
          clear();
          router.back();
        }}
      />
      {me?.role === "mentor" && <MentorInfoForm />}
      {me?.role === "mentee" && <MenteeInfoForm />}
    </>
  );
};

export default Page;
