"use client";

import Link from "next/link";
import { useGetMe } from "@/api/user/hooks/useGetMe";
import { Header } from "@/app/_components/Header";
import { UserCard } from "@/app/_components/UserCard/UserCard";
import { MOCK_MENTEE, MOCK_MENTOR } from "@/mocks/dummy";

const Home = () => {
  const { data: me } = useGetMe();

  const isMentor = me.mentorYn === "Y";
  const isMentee = (me.mentorYn = "N");

  return (
    <>
      <Header />
      {isMentor && <MentorHome />}
      {isMentee && <MenteeHome />}
    </>
  );
};

const MentorHome = () => {
  return (
    <div className="flex flex-col gap-4 px-5 pb-[5.75rem] pt-[0.87rem]">
      <>
        <div className="subheading-bold mb-3">예약을 신청한 멘티가 있어요</div>
        <Link href={`/coffeechat/${123456}`}>
          <UserCard {...MOCK_MENTEE} />
        </Link>
      </>
      <>
        <div className="subheading-bold mb-3">멘티 둘러보기</div>
        <div className="flex flex-col gap-[0.81rem]">
          {new Array(10).fill(0).map((_, i) => (
            <Link key={i} href={`/profile/${i + 1}`}>
              <UserCard {...MOCK_MENTEE} />
            </Link>
          ))}
        </div>
      </>
    </div>
  );
};

const MenteeHome = () => {
  return (
    <div className="flex flex-col px-5 pb-[5.75rem] pt-[0.87rem]">
      <>
        <div className="subheading-bold mb-3">제안 온 커피챗</div>
        <Link href={`/coffeechat/${78910}`}>
          <UserCard {...MOCK_MENTEE} imageUrl="/images/mock_profile2.png" />
        </Link>
        <div className="subheading-bold mb-3">멘토 둘러보기</div>
      </>
      <>
        <div className="flex flex-col gap-[0.81rem]">
          {new Array(10).fill(0).map((_, i) => (
            <Link key={i} href={`/profile/${i + 11}`}>
              <UserCard {...MOCK_MENTOR} imageUrl="/images/mock_profile2.png" />
            </Link>
          ))}
        </div>
      </>
    </div>
  );
};

export default Home;
