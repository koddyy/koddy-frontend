/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { useGetUserById } from "@/apis/user/hooks/useGetUserById";
import { ResultBottomSheet } from "@/app/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { ScheduleForm } from "@/app/(main)/schedule/components/ScheduleForm";
import type {
  FirstStep,
  ScheduleForm as ScheduleFormType,
  SecondStep,
} from "@/app/(main)/schedule/types/scheduleForm";
import { NavigationBar } from "@/app/components/NavigationBar";
import { LinkButton } from "@/components/Button";
import useReserveCoffeeChat from "./hooks/useReserveCoffeeChat";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const mentor = Number(searchParams.id);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ScheduleFormType>({
    date: new Date(),
    timeRange: "",
    question: "",
  });
  const { isReserved, reserveCoffeeChat } = useReserveCoffeeChat();
  const { data: user } = useGetUserById(mentor);
  const { data: me } = useGetMe();

  if (!me || !user) return;

  if (me.role === "mentor" || user.role === "mentee") {
    router.replace("/");
    return;
  }

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: FirstStep) => {
    setCurrentStep((prev) => prev + 1);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmitSchedule = (data: SecondStep) => {
    /** @TODO 임시로 기존 id 타입(string)을 따르기 위한 타입 캐스팅 */
    reserveCoffeeChat({ ...formData, ...data }, { mentor: String(mentor), mentee: String(me.id) });
  };

  return (
    <>
      <NavigationBar title="멘토링 신청" onClickGoback={handleClickGoback} />
      <div className="px-5 pb-[4.5rem] pt-4">
        {/* {currentStep === 1 && (
          <ScheduleForm.FirstStep
            availableTimes={user.availableTimes}
            onClickNextStep={handleClickNextStep}
          />
        )} */}
        {currentStep === 2 && <ScheduleForm.SecondStep onSubmitSchedule={handleSubmitSchedule} />}
      </div>
      {isReserved && (
        <ResultBottomSheet
          resultType="positive"
          description={["OOO님과의", "커피챗이 신청되었습니다."]}
          confirmButton={<LinkButton href="/">예약 페이지로 가기</LinkButton>}
        />
      )}
    </>
  );
};

export default Page;
