import { useState } from "react";
import { PatchCoffeeChatApplyToApproveRequest } from "@/apis/coffeechat-status/types";
import { useSteps } from "@/hooks/useSteps";
import { CoffeeChatTypeSelectBottomSheet } from "./CoffeeChatTypeSelectBottomSheet";
import { QuestionToMenteeBottomSheet } from "./QuestionToMenteeBottomSheet/QuestionToMenteeBottomSheet";

interface ApproveStepsBottomSheetProps {
  onClose: () => void;
  onSubmit: (data: Omit<PatchCoffeeChatApplyToApproveRequest, "coffeeChatId">) => void;
}

export const ApproveStepsBottomSheet = ({ onClose, onSubmit }: ApproveStepsBottomSheetProps) => {
  const { currentStep: currentApproveStep, goToNextStep } = useSteps(2);
  const [coffeeChatMethod, setCoffeeChatMethod] =
    useState<Pick<PatchCoffeeChatApplyToApproveRequest, "chatType" | "chatValue">>();

  const goToNextApproveStep = ({
    chatType,
    chatValue,
  }: Pick<PatchCoffeeChatApplyToApproveRequest, "chatType" | "chatValue">) => {
    setCoffeeChatMethod({ chatType, chatValue });
    goToNextStep();
  };

  return (
    <>
      {currentApproveStep === 1 && (
        <CoffeeChatTypeSelectBottomSheet
          onClose={onClose}
          onClickNext={({ chatType, chatValue }) => {
            goToNextApproveStep({ chatType, chatValue });
          }}
        />
      )}
      {currentApproveStep === 2 && (
        <QuestionToMenteeBottomSheet
          onClose={onClose}
          onSubmit={(question) => {
            if (coffeeChatMethod) {
              onSubmit({
                question,
                ...coffeeChatMethod,
              });
            }
          }}
        />
      )}
    </>
  );
};
