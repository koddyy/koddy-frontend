"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignupAsMentor } from "@/apis/user/hooks/useSignupAsMentor";
import { NavigationBar } from "@/app/components/NavigationBar";
import { useProviderStore } from "@/stores/provider";
import { useUserStore } from "@/stores/user";
import { SignupSuccess } from "../components/SignupSuccess";
import { TermsOfService } from "../components/TermsOfService";
import { SignupForm as ISignupForm } from "../types/mentorForm";
import { SignupForm } from "./components/SignupForm";

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUserStore();
  const { setLoggedIn } = useProviderStore();
  const { mutate: signup } = useSignupAsMentor();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmitForm = (data: ISignupForm) => {
    if (!user) return;

    signup(
      { ...user, ...data },
      {
        onSuccess: () => {
          handleClickNextStep();
          setLoggedIn(true);
        },
      }
    );
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
