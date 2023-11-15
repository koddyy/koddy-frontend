"use client";

import Link from "next/link";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Divider } from "@/components/Divider/Divider";

const Page = ({ searchParams }: { searchParams: { type: "mentor" | "mentee" } }) => {
  const userType = searchParams.type;
  const { data: me } = useGetMe();

  return (
    <>
      <NavigationBar title="마이페이지" />
      <div className="flex flex-col items-center gap-3 pb-5 pt-[1.38rem]">
        <img
          className="h-[6.75rem] w-[6.75rem] rounded-xl object-cover"
          src="/images/mock_profile.png"
        />
        <div className="flex flex-col items-center gap-1">
          <span className="headline-2">{me?.name}</span>
          <p className="text-gray-600">{me?.introduce}</p>
        </div>
      </div>
      <Divider className="border-4 border-gray-100" />
      <div>
        {userType === "mentor" && (
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
