"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UserType } from "@/app/[locale]/signup/components/UserTypeCard";
import { UserTypeCard } from "@/app/[locale]/signup/components/UserTypeCard";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { useSteps } from "@/hooks/useSteps";
import { useRouter } from "@/libs/navigation";
import { SupportLocale } from "@/types/locale";
import { LocaleSelectStep } from "./components/LocaleSelectStep";

const Page = () => {
  const t = useTranslations("signup");
  const router = useRouter();
  const { currentStep, firstStep, lastStep, goToPrevStep, goToNextStep } = useSteps(2);
  const [selectedUserType, setSelectedUserType] = useState<UserType>();
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
          <>
            <h2 className="headline-3 my-5 text-center">{t("title")}</h2>
            <div className="flex flex-col gap-[1.75rem] px-8">
              <UserTypeCard
                type="mentor"
                onClick={() => setSelectedUserType("mentor")}
                isSelected={selectedUserType === "mentor"}
              />
              <UserTypeCard
                type="mentee"
                onClick={() => setSelectedUserType("mentee")}
                isSelected={selectedUserType === "mentee"}
              />
            </div>
          </>
        )}
        {currentStep === 2 && (
          <LocaleSelectStep
            selectedLocale={selectedLocale}
            onChangeLocale={(locale) => setSelectedLocale(locale)}
          />
        )}
      </div>
      <BottomButton
        onClick={() => {
          if (lastStep) {
            router.push(`/signup/${selectedUserType}`, { locale: selectedLocale });
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
