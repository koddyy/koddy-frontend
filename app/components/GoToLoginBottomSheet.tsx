import { useTranslations } from "next-intl";
import { BottomSheet, BottomSheetProps } from "@/components/BottomSheet";
import { LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";

interface GoToLoginBottomSheetProps extends BottomSheetProps {
  onClose: () => void;
}

export const GoToLoginBottomSheet = ({ isOpen, onClose }: GoToLoginBottomSheetProps) => {
  const t = useTranslations("GoToLogin");

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-[12px]">
        <img src="/images/illustration_login.svg" />
        <div className="subheading-bold text-center">
          {t.rich("description", {
            br: () => <br />,
          })}
        </div>
      </div>
      <div className="flex py-[20px]">
        <LinkButton href={PATH.LOGIN}>{t("go-to-login")}</LinkButton>
      </div>
    </BottomSheet>
  );
};
