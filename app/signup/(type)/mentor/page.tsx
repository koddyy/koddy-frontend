"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { FourthStep } from "@/app/signup/(type)/mentor/_components/FourthStep";
import { SecondStep } from "@/app/signup/(type)/mentor/_components/SecondStep";
import { ThirdStep } from "@/app/signup/(type)/mentor/_components/ThirdStep";
import type { FourthStepData, SecondStepData, ThirdStepData } from "@/types/data";

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2); // TODO: 1step 추가 후 초기값 변경
  const [formData, setFormData] = useState<SecondStepData | ThirdStepData | FourthStepData>();

  const handleClickGoback = () => {
    if (currentStep === 2) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: SecondStepData | ThirdStepData) => {
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
        {currentStep === 2 && <SecondStep onClickNextStep={handleClickNextStep} />}
        {currentStep === 3 && <ThirdStep onClickNextStep={handleClickNextStep} />}
        {currentStep === 4 && <FourthStep onSubmitForm={handleSubmitForm} />}
      </div>
    </>
  );
};

export default Page;
