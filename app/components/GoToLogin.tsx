import { LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";

export const GoToLogin = () => {
  return (
    <div className="flex flex-col px-[69px]">
      <div className="body-1 mb-[19px] text-center">
        로그인하고
        <br />
        확인할 수 있어요
      </div>
      <LinkButton
        href={PATH.LOGIN}
        className="body-1-bold border border-primary bg-transparent py-[10px] text-gray-600"
      >
        로그인/회원가입 하기
      </LinkButton>
    </div>
  );
};
