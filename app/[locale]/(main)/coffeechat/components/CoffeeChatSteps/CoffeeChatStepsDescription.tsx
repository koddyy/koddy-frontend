import { useTranslations } from "next-intl";
import Close from "@/assets/close.svg";
import InfoCircle from "@/assets/Info_circle.svg";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Tooltip } from "@/components/Tooltip";
import { useToggle } from "@/hooks/useToggle";

export const CoffeeChatStepsDescription = () => {
  const t = useTranslations("coffeechat");

  const [isOpenInfo, toggleIOpenInfoTooltip] = useToggle();

  return (
    <>
      <Tooltip
        position="bottom-right"
        open={isOpenInfo}
        content={
          <div className="rounded-[12px] border border-gray-200 bg-white px-[12px] py-[10px] shadow-[2px_4px_8px_0px_#0000001A]">
            <div className="flex justify-between">
              <div className="body-3-bold">{t("coffeechat-steps-info.label")}</div>
              <button type="button" onClick={toggleIOpenInfoTooltip}>
                <Close className="text-gray-500" width={20} height={20} />
              </button>
            </div>
            <Divider className="my-[8px] mt-[4px] border-gray-200" />
            <div className="body-3 whitespace-pre">{t("coffeechat-steps-info.description")}</div>
          </div>
        }
      >
        <Button
          variant="ghost"
          fullWidth={false}
          size="xs"
          className="body-3 flex items-center gap-[5px] px-0 text-gray-500"
          onClick={toggleIOpenInfoTooltip}
        >
          <InfoCircle className="text-gray-400" width={20} height={20} />
          {t("coffeechat-steps-info.label")}
        </Button>
      </Tooltip>
    </>
  );
};
