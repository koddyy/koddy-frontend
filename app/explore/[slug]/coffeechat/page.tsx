"use client";

import { useState } from "react";
import { GoToLogin } from "@/app/components/GoToLogin";
import { Header } from "@/app/components/Header";
import { cn } from "@/utils/cn";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Header />
      <div className="body-2 flex w-full border-b border-b-gray-300 text-gray-600">
        {["대기", "지나간 일정"].map((label, i) => (
          <button
            key={i}
            className={cn(
              "grow py-4",
              activeTab === i && "border-b-[3px] border-b-primary font-bold text-primary"
            )}
            onClick={() => setActiveTab(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="py-[142px]">
        <GoToLogin />
      </div>
    </>
  );
};

export default Page;
