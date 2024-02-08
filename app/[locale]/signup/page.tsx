"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UserType } from "@/app/[locale]/signup/components/UserTypeCard";
import { UserTypeCard } from "@/app/[locale]/signup/components/UserTypeCard";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";

const Page = () => {
  const t = useTranslations("signup");
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<UserType>();

  return (
    <div className="flex flex-col">
      <NavigationBar onClickGoback={() => router.back()} />
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
      <BottomButton onClick={() => router.push(`/signup/${selectedUserType}`)}>
        {t("next")}
      </BottomButton>
    </div>
  );
};

export default Page;
