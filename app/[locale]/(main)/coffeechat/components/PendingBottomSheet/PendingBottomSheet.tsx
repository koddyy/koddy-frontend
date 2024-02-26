import { useTranslations } from "next-intl";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";

type ResultType = "positive" | "negative";

interface ResultBottomSheetProps extends BottomSheetProps {
  resultType: ResultType;
  description: string;
  onClickNo: () => void;
  onClickYes: () => void;
}

export const PendingBottomSheet = ({
  resultType,
  description,
  onClickNo,
  onClickYes,
  isOpen,
  onClose,
}: ResultBottomSheetProps) => {
  const t = useTranslations("coffeechat.PendingBottomSheet");

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-[1.13rem] pb-4 pt-[3rem]">
        <div>
          <img
            src={
              resultType === "positive"
                ? "/images/illustration_success.svg"
                : "/images/illustration_fail.svg"
            }
          />
        </div>
        <div className="subheading-bold whitespace-pre-wrap text-center">{description}</div>
      </div>
      <ButtonArea>
        <Button variant="outline" onClick={onClickNo}>
          {t("no")}
        </Button>
        <Button onClick={onClickYes}>{t("yes")}</Button>
      </ButtonArea>
    </BottomSheet>
  );
};
