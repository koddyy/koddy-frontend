import Link from "next/link";
import { LinkButton } from "@/components/Button";

export const SignupSuccess = () => {
  return (
    <>
      <div className="headline-2 mb-[25px] mt-[32px]">
        가입이 완료됐어요🎉
        <br />
        <br />
        커피챗을 위한 정보를 입력해주시면
        <br />
        멘토멘티 신청이 들어올 수 있어요
      </div>
      <div className="flex flex-col gap-[14px]">
        <LinkButton href="/newcomer">정보 입력하러 가기</LinkButton>
        <Link className="body-1 text-gray-600" href="/">
          다음에 입력할게요.
        </Link>
      </div>
    </>
  );
};
