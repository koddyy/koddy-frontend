"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { useGetMentorById } from "@/apis/user/hooks/useGetMentorById";
import { ResultBottomSheet } from "@/app/[locale]/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { QuestionStep } from "@/app/[locale]/(main)/schedule/components/QuestionStep";
import { NavigationBar } from "@/app/components/NavigationBar";
import { LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";
import { useRouter } from "@/libs/navigation";
import { MenteeApplyForm } from "@/types/coffeechat";
import { ScheduleStep } from "./components/ScheduleStep";
import { useApplyCoffeeChat } from "./hooks/useApplyCoffeeChat";
import { useApproveCoffeeChat } from "./hooks/useApproveCoffeeChat";

/** @NOTE coffeechat id의 유무로 신청/수락 구분 */

const Page = ({ searchParams }: { searchParams: { mentor: string; coffeechat?: string } }) => {
  const t = useTranslations();

  const mentorId = Number(searchParams.mentor);
  const coffeeChatId = Number(searchParams.coffeechat);

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<MenteeApplyForm>();

  const { isApplySuccess, applyCoffeeChat } = useApplyCoffeeChat();
  const { isApproveSuccess, approveCoffeeChat } = useApproveCoffeeChat();
  const { data: user, isLoading: isLoadingMentor } = useGetMentorById(mentorId);
  const { data: me, isLoading: isLoadingMe } = useGetMe();

  if (isLoadingMentor || isLoadingMe) return null;

  if (me?.role === "mentor" || !user) {
    router.replace("/");
    return;
  }

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onSubmitForm = (data: MenteeApplyForm) => {
    if (coffeeChatId) approveCoffeeChat(coffeeChatId, data);
    else applyCoffeeChat(mentorId, data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <NavigationBar title={t("schedule.title")} onClickGoback={handleClickGoback} />
        <div className="px-5 pb-[4.5rem] pt-4">
          {currentStep === 1 && (
            <ScheduleStep mentorId={mentorId} onClickNextStep={handleClickNextStep} />
          )}
          {currentStep === 2 && <QuestionStep />}
        </div>
      </form>
      <ResultBottomSheet
        isOpen={isApproveSuccess}
        resultType="positive"
        description={t("coffeechat.ResultBottomSheet.APPROVE", { name: user.name })}
        confirmButton={
          <LinkButton href={PATH.COFFEECHAT}>
            {t("coffeechat.ResultBottomSheet.go-to-calendar")}
          </LinkButton>
        }
      />
      <ResultBottomSheet
        isOpen={isApplySuccess}
        resultType="positive"
        description={t("coffeechat.ResultBottomSheet.APPLY", { name: user.name })}
        confirmButton={
          <LinkButton href={PATH.COFFEECHAT}>
            {t("coffeechat.ResultBottomSheet.go-to-calendar")}
          </LinkButton>
        }
      />
    </FormProvider>
  );
};

export default Page;
