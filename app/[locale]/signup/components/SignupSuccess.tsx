import Link from "next/link";
import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/Button";

export const SignupSuccess = () => {
  const t = useTranslations("signup.SignupSuccess");

  return (
    <>
      <div className="headline-2 mb-[25px] mt-[32px]">
        {t("success")}
        <br />
        <br />
        {t.rich("guide", {
          br: () => <br />,
        })}
      </div>
      <div className="flex flex-col gap-[14px]">
        <LinkButton href="/newcomer">{t("정보 입력하러 가기")}</LinkButton>
        <Link className="body-1 text-center text-gray-600" href="/">
          {t("다음에 입력할게요")}
        </Link>
      </div>
    </>
  );
};
