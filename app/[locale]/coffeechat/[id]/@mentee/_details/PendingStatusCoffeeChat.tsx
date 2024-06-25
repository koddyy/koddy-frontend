import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { BottomSheet } from "@/components/BottomSheet";
import { Button, LinkButton } from "@/components/Button";
import useCancelCoffeeChat from "@/features/coffeechat/hooks/useCancelCoffeeChat";
import { CoffeeChatSchedule } from "@/features/coffeechat/ui/CoffeeChatSchedule";
import { RejectReasonSelect } from "@/features/coffeechat/ui/RejectBottomSheet";
import { Result } from "@/features/coffeechat/ui/ResultBottomSheet/ResultBottomSheet";

export const PendingStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTEE_PENDING") return null;

  return (
    <>
      <CoffeeChatSchedule startTime={coffeeChat.start} endTime={coffeeChat.end} />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentor")}</span>
          <p className="text-box">{coffeeChat.suggestReason}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentor")}</span>
          <p className="text-box">{coffeeChat.question}</p>
        </div>
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={setIsCancelTrue}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>

      <BottomSheet isOpen={isCancel} onClose={lastCancelStep ? null : setIsCancelFalse}>
        {cancelStep === 1 && (
          <RejectReasonSelect
            type="cancel"
            userName={mentor.name}
            onClickRejectButton={(cancelReason) =>
              cancelCoffeeChat(
                { coffeeChatId: id, cancelReason },
                {
                  onSuccess: () => {
                    goToNextCancelStep();
                  },
                }
              )
            }
          />
        )}
        {cancelStep === 2 && (
          <Result
            resultType="negative"
            description={t("ResultBottomSheet.CANCEL", { name: mentor.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};
