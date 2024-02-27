import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";

interface GoToScheduleCompleteBottomSheetProps extends BottomSheetProps {
  onClose: () => void;
}

export const GoToScheduleCompleteBottomSheet = ({
  isOpen,
  onClose,
}: GoToScheduleCompleteBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-[12px]">
        <div className="h-[148px] w-[224px] rounded-[12px] bg-gray-200" />
        <div className="subheading-bold mb-[9px] text-center">
          프로필을 완성해주시면
          <br />
          커피챗을 제안할 수 있어요
        </div>
      </div>
      <ButtonArea>
        <LinkButton href={PATH.MYPAGE_EDIT_SCHEDULE}>완성하러 가기</LinkButton>
      </ButtonArea>
    </BottomSheet>
  );
};
