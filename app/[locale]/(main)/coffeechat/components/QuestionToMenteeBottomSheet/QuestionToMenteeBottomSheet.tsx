import { useState } from "react";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { TextArea } from "@/components/TextArea";

interface QuestionToMenteeBottomSheetProps extends BottomSheetProps {
  onSubmit: (question: string) => void;
}

export const QuestionToMenteeBottomSheet = ({
  onClose,
  onSubmit,
}: QuestionToMenteeBottomSheetProps) => {
  const [value, setValue] = useState("");

  return (
    <BottomSheet onClose={onClose}>
      <div className="mb-[12px] flex flex-col gap-[12px]">
        <div className="subheading-bold">멘티에게 궁금한 점 적기</div>
        <TextArea
          className="h-[191px]"
          placeholder="멘티에게 궁금한 점을 적어주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <ButtonArea>
        <Button disabled={!value} onClick={() => onSubmit(value)}>
          다음
        </Button>
      </ButtonArea>
    </BottomSheet>
  );
};
