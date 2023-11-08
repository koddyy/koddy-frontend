"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { FirstStep } from "@/app/signup/(type)/_components/FirstStep";
import { FourthStep } from "@/app/signup/(type)/mentor/_components/FourthStep";
import { SecondStep } from "@/app/signup/(type)/mentor/_components/SecondStep";
import { ThirdStep } from "@/app/signup/(type)/mentor/_components/ThirdStep";
import { Progress } from "@/components/Progress";
import type { FirstStepData, FourthStepData, SecondStepData, ThirdStepData } from "@/types/data";

const TOTAL_STEPS = 4;

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<
    FirstStepData | SecondStepData | ThirdStepData | FourthStepData
  >();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: FirstStepData | SecondStepData | ThirdStepData) => {
    console.log({ ...formData, ...data });
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmitForm = (data: FourthStepData) => {
    // TODO: mutate
    console.log({ ...formData, ...data });
  };

  return (
    <>
      <NavigationBar title="회원가입" onClickGoback={handleClickGoback} />
      <div className="px-5 pt-6">
        <Progress percent={(100 / TOTAL_STEPS) * currentStep} />
        {currentStep === 1 && <FirstStep onClickNextStep={handleClickNextStep} />}
        {currentStep === 2 && <SecondStep onClickNextStep={handleClickNextStep} />}
        {currentStep === 3 && <ThirdStep onClickNextStep={handleClickNextStep} />}
        {currentStep === 4 && <FourthStep onSubmitForm={handleSubmitForm} />}
      </div>
    </>
  );
};

export default Page;
