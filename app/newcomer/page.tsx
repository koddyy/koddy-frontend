"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Progress } from "@/components/Progress";
import { IntroductionStep } from "./components/IntroductionStep";
import { PeriodStep } from "./components/PeriodStep";
import { ScheduleStep } from "./components/ScheduleStep";

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { data: user } = useGetMe();

  if (!user) return;

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const TOTAL_STEPS = user.role === "mentor" ? 3 : 1;

  return (
    <>
      <NavigationBar
        onClickGoback={handleClickGoback}
        rightContent={
          <button className="body-1" onClick={handleClickNextStep}>
            건너뛰기
          </button>
        }
      />
      <div className="px-[20px] pb-[104px] pt-[24px]">
        {user.role === "mentor" && (
          <>
            <div className="mb-[24px]">
              <Progress percent={(currentStep / TOTAL_STEPS) * 100} />
            </div>
            {currentStep === 1 && <IntroductionStep onClickNextStep={handleClickNextStep} />}
            {currentStep === 2 && <PeriodStep onClickNextStep={handleClickNextStep} />}
            {currentStep === 3 && <ScheduleStep />}
          </>
        )}
        {user.role === "mentee" && <IntroductionStep onClickNextStep={handleClickNextStep} />}
      </div>
    </>
  );
};

export default Page;
