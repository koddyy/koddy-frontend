import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { BottomSheet } from "@/components/BottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { RejectReasonSelect } from "../../../components/RejectBottomSheet";
import { Result } from "../../../components/ResultBottomSheet/ResultBottomSheet";

export const SuggestStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTOR_SUGGEST") return null;

  return (
    <>
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
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
