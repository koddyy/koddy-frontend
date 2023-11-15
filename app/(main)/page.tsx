"use client";

import { Suspense } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { BrowseListSkeleton } from "@/app/(main)/components/BrowseListSkeleton";
import { BrowseMenteeList } from "@/app/(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/(main)/components/BrowseMentorList";
import { NewCoffeeChatList } from "@/app/(main)/components/NewCoffeeChatList";
import { Header } from "@/app/components/Header";

const Home = () => {
  const { data: me } = useGetMe();

  if (!me) return;

  const isMentor = me.mentorYn === "Y";
  const isMentee = me.mentorYn === "N";

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 px-5 pb-[5.75rem] pt-[0.87rem]">
        <div>
          <div className="subheading-bold mb-3">
            {isMentor && "예약을 신청한 멘티가 있어요"}
            {isMentee && "제안 온 커피챗"}
          </div>
          <Suspense fallback={<NewCoffeeChatList.Skeleton />}>
            <NewCoffeeChatList />
          </Suspense>
        </div>
        <div>
          <div className="subheading-bold mb-3">
            {isMentor && "멘티 둘러보기"}
            {isMentee && "멘토 둘러보기"}
          </div>
          <Suspense fallback={<BrowseListSkeleton />}>
            {isMentor && <BrowseMenteeList />}
            {isMentee && <BrowseMentorList />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Home;
