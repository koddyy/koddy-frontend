"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSignupAsMentor } from "@/apis/user/hooks/useSignupAsMentor";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Progress } from "@/components/Progress";
import { useRouter } from "@/libs/navigation";
import { useProviderStore } from "@/stores/provider";
import { useUserStore } from "@/stores/user";
import { MainLanguageSelectForm } from "../components/MainLanguageSelectForm";
import { SignupSuccess } from "../components/SignupSuccess";
import { SubLanguageSelectForm } from "../components/SubLanguageSelectForm";
import type { SignupForm } from "../types/mentorForm";
import { BasicInformationForm } from "./components/BasicInformationForm";

const TOTAL_STEPS = 3;

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<SignupForm>({
    defaultValues: {
      languages: {
        sub: [],
      },
    },
  });
  const { user } = useUserStore();
  const { provider, socialId, setLoggedIn } = useProviderStore();
  const { mutate: signup } = useSignupAsMentor();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onSubmitForm = (data: SignupForm) => {
    if (!user || !provider || !socialId) return;

    signup(
      { provider, socialId, ...user, ...data },
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
        <div className="mb-[23px] mt-[17px]">
          <Progress percent={(currentStep / TOTAL_STEPS) * 100} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitForm)}>
            {currentStep === 1 && <BasicInformationForm onClickNextStep={handleClickNextStep} />}
            {currentStep === 2 && <MainLanguageSelectForm onClickNextStep={handleClickNextStep} />}
            {currentStep === 3 && <SubLanguageSelectForm />}
          </form>
        </FormProvider>
        {currentStep === 4 && <SignupSuccess />}
      </div>
    </>
  );
};

export default Page;
