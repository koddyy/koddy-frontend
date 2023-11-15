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
  options = REJECT_OPTIONS,
  userName,
  onClickRejectButton,
  onClose,
}: RejectBottomSheetProps) => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickRejectButton = () => {
    if (!isNil(selectedOption)) {
      onClickRejectButton(inputRef.current?.value || REJECT_OPTIONS[selectedOption]);
    }
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="subheading-bold">
        {userName}님과의 커피챗을
        <br />
        {type === "reject" ? "거절" : "취소"}하는 이유를 알려주세요.
      </div>
      <div className="my-5 flex flex-col gap-3">
        {options.map((option, i) => {
          const isSelected = selectedOption === i;
          return (
            <Button
              key={i}
              variant="outline"
              className={cn(
                "body-2 rounded-[0.625rem] border border-gray-400 px-3 py-[0.66rem] text-start text-gray-700",
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
          placeholder="직접 입력"
          ref={inputRef}
          onFocus={() => setSelectedOption(3)}
        />
      </div>
      <ButtonArea>
        <Button onClick={handleClickRejectButton} disabled={isNil(selectedOption)}>
          {type === "reject" ? "거절하기" : "취소하기"}
        </Button>
      </ButtonArea>
    </BottomSheet>
  );
};
