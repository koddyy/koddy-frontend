"use client";

import { useTranslations } from "next-intl";
import { useUpdateMentorProfile } from "@/apis/user/hooks/useUpdateMentorProfile";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button } from "@/components/Button";
import { Progress } from "@/components/Progress";
import { useCompleteProfileFormStore } from "@/features/user/store/complete";
import { IntroductionStep } from "@/features/user/ui/IntroductionStep";
import { PeriodStep } from "@/features/user/ui/PeriodStep";
import { ProfileImageStep } from "@/features/user/ui/ProfileImageStep";
import { ScheduleStep } from "@/features/user/ui/ScheduleStep";
import { useSteps } from "@/hooks/useSteps";
import { useRouter } from "@/libs/navigation";

const TOTAL_STEPS = 4;

const Page = () => {
  const t = useTranslations("newcomer");

  const router = useRouter();
  const { currentStep, firstStep, lastStep, goToPrevStep, goToNextStep } = useSteps(TOTAL_STEPS);
  const { introduction, period, schedules } = useCompleteProfileFormStore();

  const { mutate: updateMentorProfile } = useUpdateMentorProfile();

  const isDirty = introduction || period || schedules;

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
                updateMentorProfile(
                  {
                    introduction,
                    period,
                    schedules,
                  },
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
      <div className="px-[20px]">
        <div className="my-[24px]">
          <Progress percent={(currentStep / TOTAL_STEPS) * 100} />
        </div>
        {currentStep === 1 && <IntroductionStep onClickNextStep={goToNextStep} />}
        {currentStep === 2 && <PeriodStep onClickNextStep={goToNextStep} />}
        {currentStep === 3 && <ScheduleStep onClickNextStep={goToNextStep} />}
        {currentStep === 4 && (
          <ProfileImageStep
            onSubmitForm={(profileImageFile) => {
              updateMentorProfile(
                {
                  introduction,
                  period,
                  schedules,
                  profileImageFile,
                },
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
