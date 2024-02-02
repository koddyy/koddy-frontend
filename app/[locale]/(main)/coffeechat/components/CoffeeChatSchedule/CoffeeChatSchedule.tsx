import { Divider } from "@/components/Divider/Divider";
import { CoffeeChatTypeIcon } from "@/constants/coffeechat";
import useClipboard from "@/hooks/useClipboard";
import { CoffeeChatStatus } from "@/types/coffeechat";
import { cn } from "@/utils/cn";

interface CoffeeChatScheduleProps {
  status: Exclude<CoffeeChatStatus, "SUGGEST" | "CANCEL,REJECT">;
  schedule: string;
}

const ScheduleLabel = {
  APPROVE: "예정 시간",
  APPLY: "신청 시간",
  PENDING: "신청 시간",
  COMPLETE: "시간",
};

export const CoffeeChatSchedule = ({ status, schedule }: CoffeeChatScheduleProps) => {
  const { copyText } = useClipboard();

  const MeetingOptionIcon = CoffeeChatTypeIcon.zoom;

  return (
    <>
      <Divider className="border-[4px]" />
      <div className="px-[20px] py-[18px]">
        <div className="body-3 mb-[4px]">{ScheduleLabel[status]}</div>
        <div className={cn("body-1-bold", status === "COMPLETE" && "body-1 text-gray-500")}>
          {schedule}
        </div>
      </div>
      <Divider className="border-[4px]" />
      {status === "APPROVE" && (
        <>
          <div className="px-[20px] pb-[24px] pt-[22px]">
            <div className="mb-[10px] flex">
              <span className="body-3 mr-[4px] shrink-0 basis-[46px]">방식</span>
              <div className="flex items-center gap-[6px]">
                <MeetingOptionIcon />
                <span className="text-gray-600">Zoom</span>
              </div>
            </div>
            <div className="flex">
              <span className="body-3 mr-[4px] shrink-0 basis-[46px]">링크</span>
              <div className="grow">
                <div className="body-2 mb-[6px] break-all text-gray-600">
                  https://us04web.zoom.us/dfajd8f21DFsdkg23kkfjS32u234kdsjfdsjfksj
                </div>
                <div className="text-end">
                  <button
                    className="body-3 text-gray-400 underline"
                    type="button"
                    onClick={() => copyText("https://us04web.zoom.us/")}
                  >
                    링크 복사
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Divider className="border-[4px]" />
        </>
      )}
    </>
  );
};
