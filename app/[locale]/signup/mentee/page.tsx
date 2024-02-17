"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useSignupAsMentee } from "@/apis/user/hooks/useSignupAsMentee";
import { SignupForm as ISignupForm } from "@/app/[locale]/signup/types/menteeForm";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Progress } from "@/components/Progress";
import { useSteps } from "@/hooks/useSteps";
import { useRouter } from "@/libs/navigation";
import { useProviderStore } from "@/stores/provider";
import { useUserStore } from "@/stores/user";
import { MainLanguageSelectForm } from "../components/MainLanguageSelectForm";
import { SignupSuccess } from "../components/SignupSuccess";
import { SubLanguageSelectForm } from "../components/SubLanguageSelectForm";
import { BasicInformationForm } from "./components/BasicInformationForm";

const TOTAL_STEPS = 4;

const Page = () => {
  const router = useRouter();
  const { currentStep, firstStep, goToPrevStep, goToNextStep } = useSteps(TOTAL_STEPS);
  const methods = useForm<ISignupForm>({
    defaultValues: {
      languages: {
        sub: [],
      },
    },
  });
  const { user } = useUserStore();
  const { provider, socialId, setLoggedIn } = useProviderStore();
  const { mutate: signup } = useSignupAsMentee();

  const onSubmitForm = (data: ISignupForm) => {
    if (!user || !provider || !socialId) return;

    signup(
      { provider, socialId, ...user, ...data },
      {
        onSuccess: () => {
          goToNextStep();
          setLoggedIn(true);
        },
      }
    );
  };

  return (
    <div>
      <NavigationBar onClickGoback={() => (firstStep ? router.back() : goToPrevStep())} />
      <div className="px-5 pt-6">
        <div className="mb-[23px] mt-[17px]">
          <Progress percent={(currentStep / TOTAL_STEPS) * 100} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitForm)}>
            {currentStep === 1 && <BasicInformationForm onClickNextStep={goToNextStep} />}
            {currentStep === 2 && <MainLanguageSelectForm onClickNextStep={goToNextStep} />}
            {currentStep === 3 && <SubLanguageSelectForm />}
          </form>
        </FormProvider>
        {currentStep === 4 && <SignupSuccess role="mentee" />}
      </div>
    </div>
  );
};

export default Page;
