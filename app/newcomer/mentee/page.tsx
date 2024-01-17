"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { useUpdateMenteeProfile } from "@/apis/user/hooks/useUpdateMenteeProfile";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { TextArea } from "@/components/TextArea";
import type { ProfileForm } from "../stores";

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Pick<ProfileForm, "introduction">>({
    values: {
      introduction: me?.introduction,
    },
  });
  const { mutate: updateMenteeProfile } = useUpdateMenteeProfile();

  const onSubmit = ({ introduction }: Pick<ProfileForm, "introduction">) => {
    updateMenteeProfile(
      { introduction },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  return (
    <>
      <NavigationBar onClickGoback={() => router.back()} />
      <form className="my-[24px] px-[20px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="headline-1 mb-[15px]">
          {me?.name ?? "OOO"}님을
          <br />
          소개해 주세요
        </div>
        <TextArea
          placeholder="간단한 소개와 커피챗을 하게 된 이유, 현재는 어떤 경험을 하고 계신지 알려주시면 좋아요!"
          {...register("introduction", { required: true })}
        />
        <BottomButton type="submit" disabled={!isValid}>
          다음
        </BottomButton>
      </form>
    </>
  );
};

export default Page;
