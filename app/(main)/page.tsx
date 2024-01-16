"use client";

import { Suspense } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { BrowseMenteeList } from "@/app/(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/(main)/components/BrowseMentorList";
import { NewCoffeeChatList } from "@/app/(main)/components/NewCoffeeChatList";
import { Header } from "@/app/components/Header";
import { UserCardListSkeleton } from "./components/UserCardListSkeleton";

const Home = () => {
  const { data: me } = useGetMe();

  if (!me) return;

  return (
    <>
      <Header />
      <div className="px-5 py-[0.87rem]">
        <Suspense fallback={<UserCardListSkeleton />}>
          <NewCoffeeChatList />
          {me.role === "mentor" && <BrowseMenteeList />}
          {me.role === "mentee" && <BrowseMentorList />}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
