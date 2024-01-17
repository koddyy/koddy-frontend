"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSignupAsMentee } from "@/apis/user/hooks/useSignupAsMentee";
import { NavigationBar } from "@/app/components/NavigationBar";
import { SignupForm as ISignupForm } from "@/app/signup/types/menteeForm";
import { Progress } from "@/components/Progress";
import { useProviderStore } from "@/stores/provider";
import { useUserStore } from "@/stores/user";
import { MainLanguageSelectForm } from "../components/MainLanguageSelectForm";
import { SignupSuccess } from "../components/SignupSuccess";
import { SubLanguageSelectForm } from "../components/SubLanguageSelectForm";
import { TermsOfService } from "../components/TermsOfService";
import { BasicInformationForm } from "./components/BasicInformationForm";

const TOTAL_STEPS = 3;

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<ISignupForm>({
    defaultValues: {
      languages: {
        sub: [],
      },
    },
  });
  const { user } = useUserStore();
  const { setLoggedIn } = useProviderStore();
  const { mutate: signup } = useSignupAsMentee();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onSubmitForm = (data: ISignupForm) => {
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
    <div>
      <NavigationBar onClickGoback={handleClickGoback} />
      <div className="px-5 pt-6">
        {2 <= currentStep && currentStep <= 4 && (
          <div className="mb-[23px] mt-[17px]">
            <Progress percent={((currentStep - 1) / TOTAL_STEPS) * 100} />
          </div>
        )}
        {currentStep === 1 && <TermsOfService onClickNextStep={handleClickNextStep} />}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitForm)}>
            {currentStep === 2 && <BasicInformationForm onClickNextStep={handleClickNextStep} />}
            {currentStep === 3 && <MainLanguageSelectForm onClickNextStep={handleClickNextStep} />}
            {currentStep === 4 && <SubLanguageSelectForm />}
          </form>
        </FormProvider>
        {currentStep === 5 && <SignupSuccess />}
      </div>
    </div>
  );
};

export default Page;
