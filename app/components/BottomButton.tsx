import { PropsWithChildren } from "react";
import { Button, ButtonProps } from "@/components/Button";

interface BottomButtonProps extends ButtonProps {}

export const BottomButton = ({
  type = "button",
  disabled,
  onClick,
  children,
}: PropsWithChildren<BottomButtonProps>) => {
  return (
    <div className="fixed bottom-0 left-1/2 z-fixed w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-4">
      <Button type={type} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};
