import { CSSProperties } from "react";
import { BottomSheet, BottomSheetProps } from "@/components/BottomSheet";
import { LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";

interface GoToLoginBottomSheetProps extends BottomSheetProps {
  onClose: () => void;
}

export const GoToLoginBottomSheet = ({ onClose }: GoToLoginBottomSheetProps) => {
  return (
    <div
      style={
        {
          ["--bottom-navigation-height"]: 0,
        } as CSSProperties
      }
    >
      <BottomSheet onClose={onClose}>
        <div className="flex flex-col items-center gap-[12px]">
          <img src="/images/illustration_login.svg" />
          <div className="subheading-bold text-center">
            로그인하고
            <br />
            모든 기능을 이용해 보세요!
          </div>
        </div>
        <div className="flex py-[20px]">
          <LinkButton href={PATH.LOGIN}>로그인하러 가기</LinkButton>
        </div>
      </BottomSheet>
    </div>
  );
};
