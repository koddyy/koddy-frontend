"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BottomButton } from "@/app/_components/BottomButton";
import { NavigationBar } from "@/app/_components/NavigationBar";
import type { UserType } from "@/app/signup/_components/UserTypeCard";
import { UserTypeCard } from "@/app/signup/_components/UserTypeCard";

const Page = () => {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<UserType>();

  return (
    <div className="flex h-screen flex-col">
      <NavigationBar onClickGoback={() => router.back()} />
      <h2 className="headline-3 my-5 text-center">회원 유형을 선택해주세요</h2>
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
      <BottomButton onClick={() => router.push(`/signup/${selectedUserType}`)}>다음</BottomButton>
    </div>
  );
};

export default Page;
