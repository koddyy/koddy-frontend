"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Progress } from "@/components/Progress";
import { Mentor } from "@/types/mentor";
import { IntroductionStep } from "./components/IntroductionStep";
import { PeriodStep } from "./components/PeriodStep";
import { ScheduleStep } from "./components/ScheduleStep";

/** @TODO api 스펙에 따라 변경 필요함 */
export type Period = { start: string; end: string };

type Form = Pick<Mentor, "introduction" | "schedules"> & {
  period: Period;
};

const TOTAL_STEPS = 3;

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<Form>();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

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
      <div>
        <div className="my-6">
          <Progress percent={(currentStep / TOTAL_STEPS) * 100} />
        </div>
        <FormProvider {...methods}>
          {currentStep === 1 && <IntroductionStep onClickNextStep={handleClickNextStep} />}
          {currentStep === 2 && <PeriodStep onClickNextStep={handleClickNextStep} />}
          {currentStep === 3 && <ScheduleStep />}
        </FormProvider>
      </div>
    </>
  );
};

export default Page;
