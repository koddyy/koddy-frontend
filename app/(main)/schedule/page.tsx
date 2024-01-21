"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { useGetUserById } from "@/apis/user/hooks/useGetUserById";
import { ResultBottomSheet } from "@/app/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { QuestionStep } from "@/app/(main)/schedule/components/QuestionStep";
import { NavigationBar } from "@/app/components/NavigationBar";
import { LinkButton } from "@/components/Button";
import { MenteeApplyForm } from "@/types/coffeechat";
import { ScheduleStep } from "./components/ScheduleStep";
import { useApproveCoffeeChat } from "./hooks/useApproveCoffeeChat";

/** @NOTE coffeechat id의 유무로 신청/수락 구분 */
const Page = ({ searchParams }: { searchParams: { mentor: string; coffeechat?: string } }) => {
  const mentorId = Number(searchParams.mentor);
  const coffeeChatId = Number(searchParams.coffeechat);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<MenteeApplyForm>();
  const { isApproved, approveCoffeeChat } = useApproveCoffeeChat();
  const { data: user, isLoading: isLoadingMentor } = useGetUserById(mentorId);
  const { data: me, isLoading: isLoadingMe } = useGetMe();

  if (isLoadingMentor || isLoadingMe) return null;

  if (me?.role === "mentor" || !user || user.role === "mentee" || !user.schedules) {
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
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <NavigationBar title="멘토링 신청" onClickGoback={handleClickGoback} />
        <div className="px-5 pb-[4.5rem] pt-4">
          {currentStep === 1 && (
            <ScheduleStep schedules={user.schedules} onClickNextStep={handleClickNextStep} />
          )}
          {currentStep === 2 && <QuestionStep />}
        </div>
        {isApproved && (
          <ResultBottomSheet
            resultType="positive"
            description={[`${user.name}님과의`, "커피챗이 신청되었습니다."]}
            confirmButton={<LinkButton href="/">예약 페이지로 가기</LinkButton>}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default Page;
