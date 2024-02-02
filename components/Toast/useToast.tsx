import { useToastContext } from "@/components/Toast";
import { UseToastProps } from "./types";

export const useToast = (options?: UseToastProps) => {
  const context = useToastContext();

  const showToast = (toastProps?: UseToastProps) => {
    context.open({ id: Date.now(), ...options, ...toastProps });
  };

  return { showToast };
};
