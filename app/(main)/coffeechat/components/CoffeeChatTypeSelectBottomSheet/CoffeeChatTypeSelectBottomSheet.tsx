import { useState } from "react";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import {
  CoffeeChatType,
  CoffeeChatTypeIcon,
  CoffeeChatTypeLabel,
  CoffeeChatTypeOptions,
} from "@/constants/coffeechat";

interface CoffeeChatTypeSelectBottomSheetProps extends BottomSheetProps {
  onSubmit: ({ chatType, chatValue }: { chatType: CoffeeChatType; chatValue: string }) => void;
}

export const CoffeeChatTypeSelectBottomSheet = ({
  onClose,
  onSubmit,
}: CoffeeChatTypeSelectBottomSheetProps) => {
  const [chatType, setChatType] = useState<CoffeeChatType>();
  const [chatValue, setChatValue] = useState("");

  const isDisabled = !chatType || !chatValue;

  const handleClickNext = () => {
    if (isDisabled) return;
    onSubmit({ chatType, chatValue });
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="mb-[12px] flex flex-col gap-[12px]">
        <div>
          <div className="subheading-bold mb-[4px]">커피챗 방식</div>
          <div className="body-2 text-gray-600">
            커피챗 방식을 선택해주시면 멘티에게 전달 드릴게요.
          </div>
        </div>
        <Select
          placeholder="커피챗 방식 선택"
          options={CoffeeChatTypeOptions}
          value={chatType}
          onChangeValue={setChatType}
          renderOption={(value) => {
            const Icon = CoffeeChatTypeIcon[value];
            return (
              <div className="flex gap-[6px] py-[8px]">
                {Icon && <Icon />}
                {CoffeeChatTypeLabel[value]}
              </div>
            );
          }}
        />
        <TextArea height="sm" value={chatValue} onChange={(e) => setChatValue(e.target.value)} />
      </div>
      <ButtonArea>
        <Button disabled={isDisabled} onClick={handleClickNext}>
          다음
        </Button>
      </ButtonArea>
    </BottomSheet>
  );
};
