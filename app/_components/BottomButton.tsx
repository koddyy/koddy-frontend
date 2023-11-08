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
    <div className="fixed inset-x-5 bottom-0 z-header pb-[2.38rem]">
      <Button type={type} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};
