import { ReactNode } from "react";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";

type ResultType = "positive" | "negative";

interface ResultBottomSheetProps extends BottomSheetProps {
  resultType: ResultType;
  description: string[];
  confirmButton?: ReactNode;
  onClose?: () => void;
}

export const ResultBottomSheet = ({
  description,
  confirmButton,
  resultType,
}: ResultBottomSheetProps) => {
  return (
    <BottomSheet>
      <div className="flex flex-col items-center gap-[2.19rem] pb-[2.38rem] pt-[3.56rem]">
        <div>
          <img
            src={
              resultType === "positive"
                ? "/images/illustration_success.png"
                : "/images/illustration_fail.png"
            }
          />
        </div>
        <div className="subheading-bold text-center">
          {description.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
      {confirmButton && <ButtonArea>{confirmButton}</ButtonArea>}
    </BottomSheet>
  );
};
