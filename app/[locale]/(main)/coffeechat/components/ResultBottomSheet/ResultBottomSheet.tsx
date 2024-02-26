import { ReactNode } from "react";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";

type ResultType = "positive" | "negative";

interface ResultBottomSheetProps extends BottomSheetProps {
  resultType: ResultType;
  description: string;
  confirmButton?: ReactNode;
  onClose?: () => void;
}

export const ResultBottomSheet = ({ isOpen, onClose, ...props }: ResultBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Result {...props} />
    </BottomSheet>
  );
};

export const Result = ({
  resultType,
  description,
  confirmButton,
}: Omit<ResultBottomSheetProps, keyof BottomSheetProps>) => {
  return (
    <>
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
      {confirmButton && <ButtonArea>{confirmButton}</ButtonArea>}
    </>
  );
};
