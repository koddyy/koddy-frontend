import { useCallback, useState } from "react";

export const useSteps = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToPrevStep = useCallback(() => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  const goToNextStep = useCallback(() => {
    if (currentStep === totalSteps) return;
    setCurrentStep((prev) => prev + 1);
  }, [currentStep, totalSteps]);

  return {
    currentStep,
    firstStep: currentStep === 1,
    lastStep: currentStep === totalSteps,
    goToPrevStep,
    goToNextStep,
  } as const;
};
