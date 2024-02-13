"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { useSteps } from "@/hooks/useSteps";
import { useRouter } from "@/libs/navigation";
import { SupportLocale } from "@/types/locale";
import { Role } from "@/types/user";
import { LocaleSelectStep } from "./components/LocaleSelectStep";
import { UserRoleSelectStep } from "./components/UserRoleSelectStep";

const Page = () => {
  const t = useTranslations("signup");

  const router = useRouter();
  const { currentStep, firstStep, lastStep, goToPrevStep, goToNextStep } = useSteps(2);
  const [selectedUserRole, setSelectedUserRole] = useState<Role>();
  const [selectedLocale, setSelectedLocale] = useState<SupportLocale>();

  return (
    <>
      <div className="flex flex-col">
        <NavigationBar
          onClickGoback={() => {
            firstStep ? router.back() : goToPrevStep();
          }}
        />
        {currentStep === 1 && (
          <UserRoleSelectStep
            selectedUserRole={selectedUserRole}
            onChangeUserRole={setSelectedUserRole}
          />
        )}
        {currentStep === 2 && (
          <LocaleSelectStep
            selectedLocale={selectedLocale}
            onChangeLocale={(locale) => setSelectedLocale(locale)}
          />
        )}
      </div>
      <BottomButton
        disabled={
          (currentStep === 1 && !selectedUserRole) || (currentStep === 2 && !selectedLocale)
        }
        onClick={() => {
          if (lastStep) {
            router.push(`/signup/${selectedUserRole}`, { locale: selectedLocale });
          } else {
            goToNextStep();
          }
        }}
      >
        {t("next")}
      </BottomButton>
    </>
  );
};

export default Page;
