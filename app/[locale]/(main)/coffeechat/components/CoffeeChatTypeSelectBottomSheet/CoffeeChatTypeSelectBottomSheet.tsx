import { useState } from "react";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import {
  CoffeeChatType,
  CoffeeChatTypeIcon,
  CoffeeChatTypeLabel,
  Meeting,
  MeetingOptions,
  SNS,
  SNSOptions,
} from "@/constants/coffeechat";
import { cn } from "@/utils/cn";

interface CoffeeChatTypeSelectBottomSheetProps extends BottomSheetProps {
  onSubmit: ({ chatType, chatValue }: { chatType: CoffeeChatType; chatValue: string }) => void;
}

export const CoffeeChatTypeSelectBottomSheet = ({
  onClose,
  onSubmit,
}: CoffeeChatTypeSelectBottomSheetProps) => {
  const [selectedType, setSelectedType] = useState<Meeting | "SNS ID">();
  const [seletedSNS, setseletedSNS] = useState<SNS>();
  const [chatValue, setChatValue] = useState("");

  const chatType = selectedType === "SNS ID" ? seletedSNS : selectedType;

  const isDisabled = !chatType || !chatValue;

  const handleClickNext = () => {
    if (isDisabled) return;
    onSubmit({ chatType, chatValue });
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="mb-[23px] flex h-[228px] flex-col gap-[12px]">
        <div>
          <div className="subheading-bold mb-[4px]">커피챗 방식</div>
          <div className="body-2 text-gray-600">
            커피챗 방식을 선택해주시면 멘티에게 전달 드릴게요.
          </div>
        </div>
        <Select
          placeholder="커피챗 방식 선택"
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
                {CoffeeChatTypeLabel[value]}
              </div>
            );
          }}
          renderOption={(value) => {
            if (value === "SNS ID") {
              return <div className="py-[8px]">SNS ID</div>;
            }

            const Icon = CoffeeChatTypeIcon[value];
            return (
              <div className="flex gap-[6px] py-[8px]">
                {Icon && <Icon />}
                {CoffeeChatTypeLabel[value]}
              </div>
            );
          }}
          dropdownClassName="border-none scrollbar-hidden shadow-[0_4px_20px_0px_rgba(0,0,0,0.15)]"
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
                {CoffeeChatTypeLabel[SNS]}
              </button>
            ))}
          </div>
        )}
        <TextArea
          className="h-full"
          placeholder={(() => {
            if (!selectedType) return "";
            else if (selectedType === "SNS ID") return "ID를 입력해 주세요.";
            return `${CoffeeChatTypeLabel[selectedType]} 링크를 입력해 주세요.`;
          })()}
          value={chatValue}
          onChange={(e) => setChatValue(e.target.value)}
        />
      </div>
      <ButtonArea>
        <Button disabled={isDisabled} onClick={handleClickNext}>
          다음
        </Button>
      </ButtonArea>
    </BottomSheet>
  );
};