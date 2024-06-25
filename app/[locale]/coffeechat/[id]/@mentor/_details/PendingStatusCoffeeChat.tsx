import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { BottomSheet } from "@/components/BottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";
import { usePendingToApproveCoffeeChat } from "@/features/coffeechat/hooks/usePendingToApproveCoffeeChat";
import { usePendingToFinallyCancelCoffeeChat } from "@/features/coffeechat/hooks/usePendingToFinallyCancelCoffeeChat";
import { CoffeeChatSchedule } from "@/features/coffeechat/ui/CoffeeChatSchedule";
import { CoffeeChatTypeSelect } from "@/features/coffeechat/ui/CoffeeChatTypeSelectBottomSheet";
import { RejectReasonSelect } from "@/features/coffeechat/ui/RejectBottomSheet";
import { Result } from "@/features/coffeechat/ui/ResultBottomSheet/ResultBottomSheet";

export const PendingStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const {
    isApprove,
    setIsApproveTrue,
    setIsApproveFalse,
    approveStep,
    lastApproveStep,
    goToNextApproveStep,
    approveCoffeeChat,
  } = usePendingToApproveCoffeeChat();

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = usePendingToFinallyCancelCoffeeChat();

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTEE_PENDING") return null;

  return (
    <>
      <CoffeeChatSchedule startTime={coffeeChat.start} endTime={coffeeChat.end} />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentee")}</span>
          <p className="text-box">{coffeeChat.question}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentee")}</span>
          <p className="text-box">{coffeeChat.suggestReason}</p>
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
      <div className="h-[96px]" />
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <div className="flex gap-5">
          <Button onClick={setIsApproveTrue}>{t("finally-accept-coffeechat")}</Button>
        </div>
      </div>

      <BottomSheet isOpen={isApprove} onClose={lastApproveStep ? null : setIsApproveFalse}>
        {approveStep === 1 && (
          <CoffeeChatTypeSelect
            onClickNext={({ chatType, chatValue }) =>
              approveCoffeeChat(
                { coffeeChatId: id, chatType, chatValue },
                {
                  onSuccess: () => {
                    goToNextApproveStep();
                  },
                }
              )
            }
          />
        )}
        {approveStep === 2 && (
          <Result
            resultType="positive"
            description={t("ResultBottomSheet.APPROVE", { name: mentee.name })}
            confirmButton={
              <LinkButton href={PATH.COFFEECHAT + "?category=scheduled"}>
                {t("ResultBottomSheet.go-to-calendar")}
              </LinkButton>
            }
          />
        )}
      </BottomSheet>

      <BottomSheet isOpen={isCancel} onClose={lastCancelStep ? null : setIsCancelFalse}>
        {cancelStep === 1 && (
          <RejectReasonSelect
            type="cancel"
            userName={mentee.name}
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
            description={t("ResultBottomSheet.CANCEL", { name: mentee.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};
