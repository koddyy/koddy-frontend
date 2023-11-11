"use client";

import Link from "next/link";
import { useState } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/app/_components/Header";
import { CoffeeChatCard } from "@/app/(home)/coffeechat/_components/CoffeeChatCard";
import { MOCK_MENTEE, MOCK_MENTOR } from "@/mocks/dummy";
import { CoffeeChatStatus } from "@/types/coffeechat";
import { cn } from "@/utils/cn";

const COFFEECHAT_STATUS: CoffeeChatStatus[] = [
  "expected",
  "requested",
  "recieved",
  "completed",
  "canceled",
];

// TODO: 유저를 구분하기 위한 임시 searchPamras, 추후 제거 예정
const Page = ({ searchParams }: { searchParams: { type: "mentor" | "mentee" } }) => {
  const type = searchParams.type ?? "mentor";
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
      <div className="flex flex-col gap-[0.88rem] px-5 py-[0.87rem] pb-40">
        {type === "mentor" &&
          new Array(5).fill(0).map((_, i) => (
            <Link key={i} href={`/coffeechat/123456?status=${COFFEECHAT_STATUS[i]}`}>
              <CoffeeChatCard
                userType={type}
                coffeechatStatus={COFFEECHAT_STATUS[i]}
                userName={MOCK_MENTEE.name}
                {...MOCK_MENTEE}
              />
            </Link>
          ))}

        {type === "mentee" &&
          new Array(5).fill(0).map((_, i) => (
            <Link key={i} href={`/coffeechat/123456?status=${COFFEECHAT_STATUS[i]}`}>
              <CoffeeChatCard
                userType={type}
                coffeechatStatus={COFFEECHAT_STATUS[i]}
                userName={MOCK_MENTOR.name}
                {...MOCK_MENTOR}
              />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Page;
