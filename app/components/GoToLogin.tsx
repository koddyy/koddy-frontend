import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";

export const GoToLogin = () => {
  const t = useTranslations("GoToLogin");

  return (
    <div className="flex flex-col px-[69px]">
      <div className="body-1 mb-[19px] text-center">
        {t.rich("description", {
          br: () => <br />,
        })}
      </div>
      <LinkButton
        href={PATH.LOGIN}
        className="body-1-bold border border-primary bg-transparent py-[10px] text-gray-600"
      >
        {t("go-to-login-or-sign-in")}
      </LinkButton>
    </div>
  );
};
