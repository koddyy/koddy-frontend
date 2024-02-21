import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { cn } from "@/utils/cn";
import { isNil } from "@/utils/typeUtils";

interface RejectBottomSheetProps extends BottomSheetProps {
  type?: "reject" | "cancel";
  options?: string[];
  userName: string;
  onClickRejectButton: (reason: string) => void;
}

const REJECT_OPTIONS = ["스케줄이 바뀌었어요", "당분간 상담이 어려워요."];

export const RejectBottomSheet = ({
  type = "reject",
  userName,
  onClickRejectButton,
  onClose,
}: RejectBottomSheetProps) => {
  const t = useTranslations("coffeechat.RejectBottomSheet");

  const [selectedOption, setSelectedOption] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickRejectButton = () => {
    if (!isNil(selectedOption)) {
      onClickRejectButton(inputRef.current?.value || REJECT_OPTIONS[selectedOption]);
    }
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="subheading-bold whitespace-pre-wrap">
        {type === "reject" && t("reject-title", { name: userName })}
        {type === "cancel" && t("cancel-title", { name: userName })}
      </div>
      <div className="my-5 flex flex-col gap-3">
        {[t("reason1"), t("reason2")].map((option, i) => {
          const isSelected = selectedOption === i;
          return (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className={cn(
                "border border-gray-400 text-start text-gray-700",
                isSelected && "body-2-bold border-primary"
              )}
              onClick={() => {
                setSelectedOption((prev) => (prev !== i ? i : undefined));
              }}
            >
              {option}
            </Button>
          );
        })}
        <Input
          className={cn(
            "body-2 border-gray-400 px-3 py-[0.66rem] focus-within:border-primary [&>input]:placeholder:text-gray-700",
            selectedOption === 3 && "body-2-bold border-primary"
          )}
          placeholder={t("write-reason")}
          ref={inputRef}
          onFocus={() => setSelectedOption(3)}
        />
      </div>
      <ButtonArea>
        <Button onClick={handleClickRejectButton} disabled={isNil(selectedOption)}>
          {type === "reject" ? t("reject-coffeechat") : t("cancel-coffeechat")}
        </Button>
      </ButtonArea>
    </BottomSheet>
  );
};
