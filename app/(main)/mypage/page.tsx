"use client";

import Link from "next/link";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Divider } from "@/components/Divider/Divider";
import { cn } from "@/utils/cn";

const Page = () => {
  const { data: me } = useGetMe();

  if (!me) return;

  const isMentor = me.role === "mentor";

  const description = isMentor
    ? `${me.school} ${me.major} ${me.enteredIn}학번`
    : `관심 : ${me.interestSchool}, ${me.interestMajor}`;

  return (
    <>
      <NavigationBar title="마이페이지" />
      <div className="flex flex-col items-center gap-3 px-11 pb-5 pt-[1.38rem]">
        <img
          className={cn(
            "h-[6.75rem] w-[6.75rem] rounded-xl object-cover",
            "border border-gray-300 bg-gray-100 object-contain p-[0.3rem]"
          )}
          src={isMentor ? "/images/empty_mentor.svg" : "/images/empty_mentee.svg"}
        />
        <div className="flex flex-col items-center gap-1">
          <span className="headline-2">{me.name}</span>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <Divider className="border-4 border-gray-100" />
      <div>
        {isMentor && (
          <>
            <Link href="/mypage/edit" className="inline-block w-full px-5 py-[0.88rem]">
              커피챗 시간 수정
            </Link>
            <Divider className="border-gray-100" />
          </>
        )}
        <div className="px-5 py-[0.88rem]">회원 정보 수정</div>
        <Divider className="border-gray-100" />
        <div className="px-5 py-[0.88rem]">비밀번호 변경</div>
      </div>
      <Divider className="border-4 border-gray-100" />
      <div>
        <div className="px-5 py-[0.88rem]">고객 센터</div>
        <Divider className="border-gray-100" />
        <div className="px-5 py-[0.88rem]">개인정보 처리방침</div>
        <Divider className="border-gray-100" />
      </div>
    </>
  );
};

export default Page;
