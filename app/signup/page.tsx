"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavigationBar } from "@/app/_components/NavigationBar";
import type { UserType } from "@/app/signup/_components/UserTypeCard";
import { UserTypeCard } from "@/app/signup/_components/UserTypeCard";
import { Button } from "@/components/Button";

const Page = () => {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<UserType>();

  return (
    <div className="flex h-screen flex-col">
      <NavigationBar onClickGoback={() => router.back()} />
      <h2 className="my-5 text-center text-xl font-bold">회원 유형을 선택해주세요</h2>
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
      <div className="mt-auto px-4 py-6">
        <Button onClick={() => router.push(`/signup/${selectedUserType}`)}>다음</Button>
      </div>
    </div>
  );
};

export default Page;
