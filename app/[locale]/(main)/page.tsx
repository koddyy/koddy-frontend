"use client";

import { Suspense } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { BrowseMenteeList } from "@/app/[locale]/(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/[locale]/(main)/components/BrowseMentorList";
import { NewCoffeeChatList } from "@/app/[locale]/(main)/components/NewCoffeeChatList";
import { Header } from "@/app/components/Header";
import { ProfileCompleteBanner } from "./components/ProfileCompleteBanner";
import { UserCardListSkeleton } from "./components/UserCardListSkeleton";

const Home = () => {
  const { data: me } = useGetMe();

  if (!me) return;

  return (
    <>
      <Header />
      <div className="px-5">
        <div className="mb-[26px] mt-[18px]">
          {!me.profileComplete && <ProfileCompleteBanner />}
        </div>
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
