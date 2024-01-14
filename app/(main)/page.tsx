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

  return (
    <>
      <Header />
      <div className="px-5 py-[0.87rem]">
        <Suspense fallback={<HomeSkeleton />}>
          <NewCoffeeChatList />
          {me.role === "mentor" && <BrowseMenteeList />}
          {me.role === "mentee" && <BrowseMentorList />}
        </Suspense>
      </div>
    </>
  );
};

const HomeSkeleton = () => {
  return (
    <>
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
