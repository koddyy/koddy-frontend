"use client";

import { useUpdateMentorProfile } from "@/apis/user/hooks/useUpdateMentorProfile";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button } from "@/components/Button";
import { Progress } from "@/components/Progress";
import { useSteps } from "@/hooks/useSteps";
import { useRouter } from "@/libs/navigation";
import { IntroductionStep } from "../components/IntroductionStep";
import { PeriodStep } from "../components/PeriodStep";
import { ProfileImageStep } from "../components/ProfileImageStep";
import { ScheduleStep } from "../components/ScheduleStep";
import { useCompleteProfileFormStore } from "./store";

const TOTAL_STEPS = 4;

const Page = () => {
  const router = useRouter();
  const { currentStep, firstStep, lastStep, goToPrevStep, goToNextStep } = useSteps(TOTAL_STEPS);
  const { introduction, period, schedules } = useCompleteProfileFormStore();

  const { mutate: updateMentorProfile } = useUpdateMentorProfile();

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
              if (lastStep) {
                updateMentorProfile({
                  introduction,
                  period,
                  schedules,
                });
              } else {
                goToNextStep();
              }
            }}
          >
            건너뛰기
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
              updateMentorProfile({
                introduction,
                period,
                schedules,
                profileImageFile,
              });
            }}
          />
        )}
      </div>
    </>
  );
};

export default Page;
