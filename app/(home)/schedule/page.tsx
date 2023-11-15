"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { useGetMentorById } from "@/apis/user/hooks/useGetMentorById";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { ResultBottomSheet } from "@/app/(home)/coffeechat/_components/ResultBottomSheet/ResultBottomSheet";
import { ScheduleForm } from "@/app/(home)/schedule/components/ScheduleForm";
import type {
  FirstStep,
  ScheduleForm as ScheduleFormType,
  SecondStep,
} from "@/app/(home)/schedule/types/scheduleForm";
import { LinkButton } from "@/components/Button";
import useReserveCoffeeChat from "./_hooks/useReserveCoffeeChat";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const mentor = searchParams.id;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ScheduleFormType>({
    date: new Date(),
    timeRange: "",
    question: "",
  });
  const { isReserved, reserveCoffeeChat } = useReserveCoffeeChat();
  const { data: user } = useGetMentorById(mentor);
  const { data: me } = useGetMe();

  if (!me || !user) return;

  if (me.mentorYn === "Y") router.replace("/");

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: FirstStep) => {
    setCurrentStep((prev) => prev + 1);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmitSchedule = (data: SecondStep) => {
    reserveCoffeeChat({ ...formData, ...data }, { mentor, mentee: me.userId });
  };

  return (
    <>
      <NavigationBar title="멘토링 신청" onClickGoback={handleClickGoback} />
      <div className="px-5 pb-40 pt-4">
        {currentStep === 1 && (
          <ScheduleForm.FirstStep
            availableTimes={user.availableTimes}
            onClickNextStep={handleClickNextStep}
          />
        )}
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
