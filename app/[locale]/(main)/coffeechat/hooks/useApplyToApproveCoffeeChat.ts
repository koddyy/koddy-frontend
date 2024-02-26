import { useState } from "react";
import { useUpdateCoffeeChatApplyToApprove } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToApprove";
import { PatchCoffeeChatApplyToApproveRequest } from "@/apis/coffeechat-status/types";
import { useSteps } from "@/hooks/useSteps";
import { useToggle } from "@/hooks/useToggle";

export const useApplyToApproveCoffeeChat = () => {
  const [isApprove, , setIsApprove] = useToggle();
  const {
    currentStep: approveStep,
    goToNextStep: goToNextApproveStep,
    lastStep: lastApproveStep,
  } = useSteps(3);

  const [coffeeChatMethod, setCoffeeChatMethod] =
    useState<Pick<PatchCoffeeChatApplyToApproveRequest, "chatType" | "chatValue">>();

  const { mutate: approveCoffeeChat } = useUpdateCoffeeChatApplyToApprove();

  const setIsApproveTrue = () => {
    setIsApprove(true);
  };

  const setIsApproveFalse = () => {
    setIsApprove(false);
  };

  return {
    isApprove,
    setIsApproveTrue,
    setIsApproveFalse,
    approveStep,
    lastApproveStep,
    goToNextApproveStep,
    coffeeChatMethod,
    setCoffeeChatMethod,
    approveCoffeeChat,
  };
};
