"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavigationBar } from "@/app/components/NavigationBar";
import { SignupSuccess } from "../components/SignupSuccess";
import { TermsOfService } from "../components/TermsOfService/TermsOfService";
import { SignupForm as ISignupForm } from "../types/mentorForm";
import { SignupForm } from "./components/SignupForm";

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmitForm = (data: ISignupForm) => {
    console.log(data);

    handleClickNextStep(); // @TODO signup
  };

  return (
    <>
      <NavigationBar onClickGoback={handleClickGoback} />
      <div className="px-5 pt-6">
        {currentStep === 1 && <TermsOfService onClickNextStep={handleClickNextStep} />}
        {currentStep === 2 && <SignupForm onSubmitForm={handleSubmitForm} />}
        {currentStep === 3 && <SignupSuccess />}
      </div>
    </>
  );
};

export default Page;
