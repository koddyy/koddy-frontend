"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignup } from "@/apis/user/hooks/useSignup";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { FirstStep } from "@/app/signup/(type)/_components/FirstStep";
import { Progress } from "@/components/Progress";
import type { FirstStepData } from "@/types/data";
import { SignupFormData } from "@/types/data";
import { SecondStep, SecondStepData } from "./_components/SecondStep";
import { ThirdStep, ThirdStepData } from "./_components/ThirdStep";

const TOTAL_STEPS = 3;

const intialSignupFormData = {
  email: "",
  password: "",
  confirm_password: "",
  name: "",
  school: "",
  grade: 0,
  major: "",
  nationality: "",
  languages: [],
  availableTimes: [],
  mentorYn: "N",
};

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>(intialSignupFormData);
  const { mutate: signup } = useSignup();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: FirstStepData | SecondStepData | ThirdStepData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmitForm = (data: ThirdStepData) => {
    signup(
      { ...formData, ...data },
      {
        onSuccess: () => {
          router.replace("/");
        },
      }
    );
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
