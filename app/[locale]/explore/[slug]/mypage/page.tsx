"use client";

import { NavigationBar } from "@/app/components/NavigationBar";
import { LinkButton } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { PATH } from "@/constants/path";
import { cn } from "@/utils/cn";

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <NavigationBar title="마이페이지" />
      <div className="mb-[33px] mt-[22px] flex flex-col items-center gap-[16px] px-[70px]">
        <img
          className={cn(
            "h-[6.75rem] w-[6.75rem] rounded-xl object-cover",
            "border border-gray-300 bg-gray-100 object-contain p-[0.3rem]"
          )}
          src={params.slug === "mentor" ? "/images/empty_mentor.svg" : "/images/empty_mentee.svg"}
        />
        <LinkButton
          href={PATH.LOGIN}
          className="body-1-bold border border-primary bg-transparent py-[10px] text-gray-600"
        >
          로그인/회원가입 하기
        </LinkButton>
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
