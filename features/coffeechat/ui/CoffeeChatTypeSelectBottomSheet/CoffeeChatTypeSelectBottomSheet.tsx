import { useTranslations } from "next-intl";
import { useState } from "react";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import {
  CoffeeChatType,
  CoffeeChatTypeIcon,
  Meeting,
  MeetingOptions,
  SNS,
  SNSOptions,
} from "@/constants/coffeechat";
import { cn } from "@/utils/cn";

interface CoffeeChatTypeSelectBottomSheetProps extends BottomSheetProps {
  onClickNext: ({
    chatType,
    chatValue,
  }: {
    chatType: Exclude<CoffeeChatType, "zoomAuto">;
    chatValue: string;
  }) => void;
}

export const CoffeeChatTypeSelectBottomSheet = ({
  isOpen,
  onClose,
  onClickNext,
}: CoffeeChatTypeSelectBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <CoffeeChatTypeSelect onClickNext={onClickNext} />
    </BottomSheet>
  );
};

export const CoffeeChatTypeSelect = ({
  onClickNext,
}: Pick<CoffeeChatTypeSelectBottomSheetProps, "onClickNext">) => {
  const t = useTranslations("coffeechat.CoffeeChatTypeSelectBottomSheet");
  const constants = useTranslations("constants");

  const [selectedType, setSelectedType] = useState<Meeting | "SNS ID">();
  const [seletedSNS, setseletedSNS] = useState<SNS>();
  const [chatValue, setChatValue] = useState("");

  const chatType = selectedType === "SNS ID" ? seletedSNS : selectedType;

  const isDisabled = !chatType || !chatValue;

  const handleClickNext = () => {
    if (isDisabled) return;
    onClickNext({ chatType, chatValue });
  };

  return (
    <>
      <div className="mb-[12px] flex h-[228px] flex-col gap-[12px]">
        <div>
          <div className="subheading-bold mb-[4px]">{t("chat-method")}</div>
          <div className="body-2 text-gray-600">{t("guide")}</div>
        </div>
        <Select
          placeholder={t("placeholder")}
          options={[...MeetingOptions, "SNS ID"]}
          value={selectedType}
          onChangeValue={setSelectedType}
          renderValue={(value) => {
            if (!value) return null;
            if (value === "SNS ID") return "SNS ID";

            const Icon = CoffeeChatTypeIcon[value];
            return (
              <div className="flex gap-[6px]">
                {Icon && <Icon />}
                {constants(`chat-method-platform.${value}`)}
              </div>
            );
          }}
          renderOption={(value) => {
            if (value === "SNS ID") {
              return <div className="body-1 py-[8px]">SNS ID</div>;
            }

            const Icon = CoffeeChatTypeIcon[value];
            return (
              <div className="body-1 flex gap-[6px] py-[8px]">
                {Icon && <Icon />}
                {constants(`chat-method-platform.${value}`)}
              </div>
            );
          }}
          dropdownClassName="border-none scrollbar-hidden shadow-[0_4px_20px_0px_rgba(0,0,0,0.15)] max-h-fit"
        />
        {selectedType === "SNS ID" && (
          <div className="flex gap-[14px]">
            {SNSOptions.map((SNS) => (
              <button
                key="sns"
                className={cn(
                  "body-2 w-full rounded-[10px] border border-gray-200 px-[18px] py-[11px] text-gray-500 transition",
                  SNS === seletedSNS && "body-2-bold border-primary-dark text-primary-dark"
                )}
                onClick={() => setseletedSNS(SNS)}
              >
                {constants(`chat-method-platform.${SNS}`)}
              </button>
            ))}
          </div>
        )}
        <TextArea
          className="h-full"
          placeholder={(() => {
            if (!selectedType) return "";
            else if (selectedType === "SNS ID") return "ID를 입력해 주세요.";
            return `${constants(`chat-method-platform.${selectedType}`)
              .replace(/\([^)]*\)/g, "")
              .trim()} 링크를 입력해 주세요.`;
          })()}
          value={chatValue}
          onChange={(e) => setChatValue(e.target.value)}
        />
      </div>
      <ButtonArea>
        <Button disabled={isDisabled} onClick={handleClickNext}>
          {t("next")}
        </Button>
      </ButtonArea>
    </>
  );
};
