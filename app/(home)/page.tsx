"use client";

import { Suspense } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { Header } from "@/app/_components/Header";
import { BrowseListSkeleton } from "@/app/(home)/_components/BrowseListSkeleton";
import { BrowseMenteeList } from "@/app/(home)/_components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/(home)/_components/BrowseMentorList";
import { NewCoffeeChatList } from "@/app/(home)/_components/NewCoffeeChatList";

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
