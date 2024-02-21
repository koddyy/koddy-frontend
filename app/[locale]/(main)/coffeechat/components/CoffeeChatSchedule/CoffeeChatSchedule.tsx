import { useTranslations } from "next-intl";
import { Divider } from "@/components/Divider/Divider";
import {
  CoffeeChatType,
  CoffeeChatTypeIcon,
  CoffeeChatTypeLabel,
  isMeetingOptions,
  isSNSOptions,
} from "@/constants/coffeechat";
import useClipboard from "@/hooks/useClipboard";

interface CoffeeChatScheduleProps {
  schedule: string;
  chatType?: CoffeeChatType;
  chatValue?: string;
}

export const CoffeeChatSchedule = ({ schedule, chatType, chatValue }: CoffeeChatScheduleProps) => {
  const t = useTranslations("coffeechat.CoffeeChatSchedule");
  const { copyText } = useClipboard();

  return (
    <>
      <Divider className="border-[4px]" />
      <div className="px-[20px] py-[18px]">
        <div className="body-3 mb-[4px]">{t("date")}</div>
        <div className="body-1-bold">{schedule}</div>
      </div>
      <Divider className="border-[4px]" />
      {chatType && chatValue && (
        <>
          <div className="px-[20px] pb-[24px] pt-[22px]">
            <div className="mb-[10px] flex">
              <span className="body-3-bold mr-[4px] shrink-0 basis-[46px]">{t("how")}</span>
              <div className="body-2 flex items-center gap-[6px]">
                {chatType === "zoom" && <CoffeeChatTypeIcon.zoom />}
                {chatType === "google" && <CoffeeChatTypeIcon.google />}
                <span className="text-gray-600">{CoffeeChatTypeLabel[chatType]}</span>
              </div>
            </div>
            <div className="flex">
              <span className="body-3-bold mr-[4px] shrink-0 basis-[46px]">
                {isMeetingOptions(chatType) && t("link")}
                {isSNSOptions(chatType) && t("sns-id")}
              </span>
              <div className="grow">
                <div className="body-2 mb-[6px] break-all text-gray-600">{chatValue}</div>
                <div className="text-end">
                  <button
                    className="body-3 text-gray-400 underline"
                    type="button"
                    onClick={() => copyText(chatValue)}
                  >
                    {isMeetingOptions(chatType) && t("copy-link")}
                    {isSNSOptions(chatType) && t("copy-id")}
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
