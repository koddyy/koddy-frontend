"use client";

import { BottomNavigation } from "@/app/components/BottomNavigation";
import { Header } from "@/app/components/Header";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { BrowseMenteeList } from "../../(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "../../(main)/components/BrowseMentorList";
import { UserCardListSkeleton } from "../../(main)/components/UserCardListSkeleton";

const Page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  return (
    <div className="pb-[58px]">
      <Header />
      <div className="px-5 py-[0.87rem]">
        <SSRSafeSuspense fallback={<UserCardListSkeleton />}>
          {slug === "mentor" && <BrowseMentorList />}
          {slug === "mentee" && <BrowseMenteeList />}
        </SSRSafeSuspense>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Page;
