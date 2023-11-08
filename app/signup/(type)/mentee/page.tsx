"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { FirstStep } from "@/app/signup/(type)/_components/FirstStep";
import { Progress } from "@/components/Progress";
import type { FirstStepData } from "@/types/data";
import { SecondStep, SecondStepData } from "./_components/SecondStep";
import { ThirdStep, ThirdStepData } from "./_components/ThirdStep";

const TOTAL_STEPS = 3;

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FirstStepData | SecondStepData | ThirdStepData>();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: FirstStepData | SecondStepData | ThirdStepData) => {
    console.log({ ...formData, ...data });
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmitForm = (data: ThirdStepData) => {
    // TODO: mutate
    console.log({ ...formData, ...data });
  };

  return (
    <div>
      <NavigationBar title="회원가입" onClickGoback={handleClickGoback} />
      <div className="px-5 pt-6">
        <Progress percent={(100 / TOTAL_STEPS) * currentStep} />
        {currentStep === 1 && <FirstStep onClickNextStep={handleClickNextStep} />}
        {currentStep === 2 && <SecondStep onClickNextStep={handleClickNextStep} />}
        {currentStep === 3 && <ThirdStep onSubmitForm={handleSubmitForm} />}
      </div>
    </div>
  );
};

export default Page;
