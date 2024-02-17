"use client";

import { useTranslations } from "next-intl";
import { useUpdateMenteeProfile } from "@/apis/user/hooks/useUpdateMenteeProfile";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button } from "@/components/Button";
import { Progress } from "@/components/Progress";
import { useSteps } from "@/hooks/useSteps";
import { useRouter } from "@/libs/navigation";
import { IntroductionStep } from "../components/IntroductionStep";
import { ProfileImageStep } from "../components/ProfileImageStep";
import { useCompleteProfileFormStore } from "../store";

const TOTAL_STEPS = 2;

const Page = () => {
  const t = useTranslations("newcomer");

  const router = useRouter();
  const { currentStep, firstStep, lastStep, goToPrevStep, goToNextStep } = useSteps(TOTAL_STEPS);
  const { introduction } = useCompleteProfileFormStore();
  const { mutate: updateMenteeProfile } = useUpdateMenteeProfile();

  const isDirty = introduction;

  return (
    <>
      <NavigationBar
        onClickGoback={() => (firstStep ? router.back() : goToPrevStep())}
        rightContent={
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="text-gray-700"
            onClick={() => {
              if (!lastStep) {
                goToNextStep();
                return;
              }

              if (isDirty) {
                updateMenteeProfile(
                  { introduction },
                  {
                    onSuccess: () => {
                      router.push("/");
                    },
                  }
                );
              } else {
                router.push("/");
              }
            }}
          >
            {t("skip")}
          </Button>
        }
      />
      <div className="my-[24px] px-[20px]">
        <div className="my-[24px]">
          <Progress percent={(currentStep / TOTAL_STEPS) * 100} />
        </div>
        {currentStep === 1 && <IntroductionStep onClickNextStep={goToNextStep} />}
        {currentStep === 2 && (
          <ProfileImageStep
            onSubmitForm={(profileImageFile) => {
              updateMenteeProfile(
                { introduction, profileImageFile },
                {
                  onSuccess: () => {
                    router.push("/");
                  },
                }
              );
            }}
          />
        )}
      </div>
    </>
  );
};

export default Page;
