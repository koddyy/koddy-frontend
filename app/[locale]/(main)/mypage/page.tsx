"use client";

import Link from "next/link";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import ThreeDots from "@/assets/three_dots.svg";
import { Divider } from "@/components/Divider/Divider";
import { PATH } from "@/constants/path";
import { cn } from "@/utils/cn";

const linkStyle = "inline-block w-full px-[20px] py-[14px]";

const Page = () => {
  const { data: me } = useGetMe();

  if (!me) return;

  const isMentor = me.role === "mentor";

  const description = isMentor
    ? `${me.school} ${me.major} ${me.enteredIn}학번`
    : `관심 : ${me.interestSchool}, ${me.interestMajor}`;

  return (
    <>
      <NavigationBar
        title="마이페이지"
        rightContent={
          <Link href={PATH.MYPAGE_ACCOUNT}>
            <ThreeDots />
          </Link>
        }
      />
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
        <Link href={PATH.MYPAGE_EDIT} className={linkStyle}>
          회원 정보 수정
        </Link>
        <Divider className="border-gray-100" />
        {isMentor && (
          <Link href={PATH.MYPAGE_EDIT + "/schedule"} className={linkStyle}>
            커피챗 기간 수정
          </Link>
        )}
      </div>
      <Divider className="border-4 border-gray-100" />
      <div>
        <Link href={PATH.MYPAGE_EDIT + "/language-and-timezone"} className={linkStyle}>
          언어 & 타임존 설정
        </Link>
        <Divider className="border-gray-100" />
        <div className="px-5 py-[0.88rem]">문의하기</div>
        <Divider className="border-gray-100" />
      </div>
    </>
  );
};

export default Page;
