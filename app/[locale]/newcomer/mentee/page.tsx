"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { useUpdateMenteeProfile } from "@/apis/user/hooks/useUpdateMenteeProfile";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { TextArea } from "@/components/TextArea";
import { useRouter } from "@/libs/navigation";
import { CompleteProfileForm } from "@/types/mentee";

const Page = () => {
  const t = useTranslations("newcomer");

  const router = useRouter();
  const { data: me } = useGetMe();
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<CompleteProfileForm>({
    values: {
      introduction: me?.introduction,
    },
  });
  const { mutate: updateMenteeProfile } = useUpdateMenteeProfile();

  const onSubmit = ({ introduction }: CompleteProfileForm) => {
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
          {t.rich("introduction.label", {
            line: (chunks) => <div>{chunks}</div>,
          })}
        </div>
        <TextArea
          placeholder={t("introduction.placeholder")}
          {...register("introduction", { required: true })}
        />
        <BottomButton type="submit" disabled={!isValid || !isDirty}>
          다음
        </BottomButton>
      </form>
    </>
  );
};

export default Page;
