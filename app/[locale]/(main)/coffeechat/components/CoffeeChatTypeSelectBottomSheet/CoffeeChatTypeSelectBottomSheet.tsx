import { useTranslations } from "next-intl";
import { useState } from "react";
import { useGetOauthUrl } from "@/apis/auth/hooks/useGetOauthUrl";
import { useCreateZoomMeetingLink } from "@/apis/coffeechat/hooks/useCreateZoomMeetingLink";
import { BottomSheet, BottomSheetProps, ButtonArea } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import {
  CoffeeChatType,
  CoffeeChatTypeIcon,
  Meeting,
  MeetingOptions,
  SNS,
  SNSOptions,
} from "@/constants/coffeechat";
import { useOauthPopupListener } from "@/hooks/useOauthPopupListener";
import { useWindowPopupOpener } from "@/hooks/useWindowPopupOpener";
import { cn } from "@/utils/cn";
import { noop } from "@/utils/noop";

interface CoffeeChatTypeSelectBottomSheetProps extends BottomSheetProps {
  onSubmit: ({
    chatType,
    chatValue,
  }: {
    chatType: Exclude<CoffeeChatType, "zoomAuto">;
    chatValue: string;
  }) => void;
  startTime: string;
  endTime: string;
}

export const CoffeeChatTypeSelectBottomSheet = ({
  onClose,
  onSubmit,
  startTime,
  endTime,
}: CoffeeChatTypeSelectBottomSheetProps) => {
  const t = useTranslations("coffeechat.CoffeeChatTypeSelectBottomSheet");

  const [selectedType, setSelectedType] = useState<Meeting | "SNS ID">();
  const [seletedSNS, setseletedSNS] = useState<SNS>();
  const [chatValue, setChatValue] = useState("");

  const { data: oauthUrl } = useGetOauthUrl("zoom");
  const { openPopup } = useWindowPopupOpener({ closeMessage: "ZOOM_OAUTH_COMPLETE" });
  const { code, state } = useOauthPopupListener();
  const { mutate: createZoomMeetingLink } = useCreateZoomMeetingLink();

  const chatType = selectedType === "SNS ID" ? seletedSNS : selectedType;

  const isDisabled = !chatType || !chatValue;

  const handleClickNext = () => {
    if (isDisabled) return;
    if (chatType !== "zoomAuto") {
      onSubmit({ chatType, chatValue });
    } else if (code && state) {
      createZoomMeetingLink(
        {
          authorizationCode: code,
          state,
          topic: chatValue,
          start: startTime,
          end: endTime,
        },
        {
          onSuccess: ({ data: { joinUrl } }) => {
            onSubmit({ chatType: "zoom", chatValue: joinUrl });
          },
        }
      );
    }
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="mb-[23px] flex h-[228px] flex-col gap-[12px]">
        <div>
          <div className="subheading-bold mb-[4px]">{t("chat-method")}</div>
          <div className="body-2 text-gray-600">{t("guide")}</div>
        </div>
        <Select
          placeholder={t("placeholder")}
          options={[...MeetingOptions, "SNS ID"]}
          value={selectedType}
          onChangeValue={setSelectedType}
          renderValue={(value) => {
            if (!value) return null;
            if (value === "SNS ID") return "SNS ID";

            const Icon = CoffeeChatTypeIcon[value];
            return (
              <div className="flex gap-[6px]">
                {Icon && <Icon />}
                {t(`platform.${value}`)}
              </div>
            );
          }}
          renderOption={(value) => {
            if (value === "SNS ID") {
              return <div className="py-[8px]">SNS ID</div>;
            }

            const Icon = CoffeeChatTypeIcon[value];
            return (
              <div
                className="flex gap-[6px] py-[8px]"
                onClick={value === "zoomAuto" ? () => openPopup(oauthUrl) : noop}
              >
                {Icon && <Icon />}
                {t(`platform.${value}`)}
              </div>
            );
          }}
          dropdownClassName="border-none scrollbar-hidden shadow-[0_4px_20px_0px_rgba(0,0,0,0.15)] max-h-fit"
        />
        {selectedType === "SNS ID" && (
          <div className="flex gap-[14px]">
            {SNSOptions.map((SNS) => (
              <button
                key="sns"
                className={cn(
                  "body-2 w-full rounded-[10px] border border-gray-200 px-[18px] py-[11px] text-gray-500 transition",
                  SNS === seletedSNS && "body-2-bold border-primary-dark text-primary-dark"
                )}
                onClick={() => setseletedSNS(SNS)}
              >
                {t(`platform.${SNS}`)}
              </button>
            ))}
          </div>
        )}
        <TextArea
          className="h-full"
          placeholder={(() => {
            if (!selectedType) return "";
            else if (selectedType === "SNS ID") return "ID를 입력해 주세요.";
            else if (selectedType === "zoomAuto") return "Zoom 제목을 입력해 주세요.";
            return `${t(`platform.${selectedType}`)
              .replace(/\([^)]*\)/g, "")
              .trim()} 링크를 입력해 주세요.`;
          })()}
          value={chatValue}
          onChange={(e) => setChatValue(e.target.value)}
        />
      </div>
      <ButtonArea>
        <Button disabled={isDisabled} onClick={handleClickNext}>
          {t("next")}
        </Button>
      </ButtonArea>
    </BottomSheet>
  );
};
