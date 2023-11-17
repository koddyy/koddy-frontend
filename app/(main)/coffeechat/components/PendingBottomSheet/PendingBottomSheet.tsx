import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";

type ResultType = "positive" | "negative";

interface ResultBottomSheetProps extends BottomSheetProps {
  resultType: ResultType;
  description: string[];
  onClickNo: () => void;
  onClickYes: () => void;
}

export const PendingBottomSheet = ({
  resultType,
  description,
  onClickNo,
  onClickYes,
}: ResultBottomSheetProps) => {
  return (
    <BottomSheet>
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
        <div className="subheading-bold text-center">
          {description.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
      <ButtonArea>
        <Button variant="outline" onClick={onClickNo}>
          아니요
        </Button>
        <Button onClick={onClickYes}>네</Button>
      </ButtonArea>
    </BottomSheet>
  );
};
