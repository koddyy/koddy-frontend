"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignup } from "@/apis/user/hooks/useSignup";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FirstStep } from "@/app/signup/components/FirstStep";
import { SecondStep } from "@/app/signup/mentee/components/SecondStep";
import { ThirdStep } from "@/app/signup/mentee/components/ThirdStep";
import {
  FirstStepForm,
  SecondStepForm,
  SignupForm,
  ThirdStepForm,
} from "@/app/signup/types/menteeForm";
import { Progress } from "@/components/Progress";

const TOTAL_STEPS = 3;

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [signupForm, setSignupForm] = useState<SignupForm>({
    email: "",
    password: "",
    name: "",
    school: "",
    major: "",
    nationality: "",
    languages: [],
    mentorYn: "N",
  });
  const { mutate: signup } = useSignup();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: FirstStepForm | SecondStepForm | ThirdStepForm) => {
    setSignupForm((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmitForm = (data: ThirdStepForm) => {
    signup(
      { ...signupForm, ...data },
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
