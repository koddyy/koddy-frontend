"use client";

import { Suspense } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { BrowseMenteeList } from "@/app/(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/(main)/components/BrowseMentorList";
import { NewCoffeeChatList } from "@/app/(main)/components/NewCoffeeChatList";
import { UserCard } from "@/app/(main)/components/UserCard";
import { Header } from "@/app/components/Header";

const Home = () => {
  const { data: me } = useGetMe();

  if (!me) return;

  const isMentor = me.mentorYn === "Y";
  const isMentee = me.mentorYn === "N";

  return (
    <>
      <Header />
      <div className="px-5 pb-[5.75rem] pt-[0.87rem]">
        <Suspense fallback={<HomeSkeleton />}>
          <NewCoffeeChatList />
          {isMentor && <BrowseMenteeList />}
          {isMentee && <BrowseMentorList />}
        </Suspense>
      </div>
    </>
  );
};

const HomeSkeleton = () => {
  return (
    <>
      <div className="mb-3 h-[1.5625rem] w-[12.5rem] rounded-xl bg-gray-100" />
      <div className="mb-4">
        <UserCard.HorizontalSkeleton />
      </div>
      <div className="mb-3 h-[1.5625rem] w-[12.5rem] rounded-xl bg-gray-100" />
      <div className="flex flex-col gap-[0.81rem]">
        {new Array(5).fill(0).map((_, i) => (
          <UserCard.HorizontalSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default Home;
