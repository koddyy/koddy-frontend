import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/Button";
import { Link } from "@/libs/navigation";

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
        <LinkButton href="/newcomer">{t("complete-profile")}</LinkButton>
        <Link className="body-1 text-center text-gray-600" href="/">
          {t("next-time")}
        </Link>
      </div>
    </>
  );
};
