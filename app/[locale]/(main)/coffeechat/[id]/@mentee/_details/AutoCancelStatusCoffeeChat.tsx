import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { CoffeeChatSchedule } from "../../../components/CoffeeChatSchedule";

export const AutoCancelStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  if (
    !mentor ||
    !coffeeChat ||
    !(
      coffeeChat.status === "AUTO_CANCEL_FROM_MENTEE_FLOW" ||
      coffeeChat.status === "AUTO_CANCEL_FROM_MENTOR_FLOW"
    )
  )
    return null;

  return (
    <>
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          startTime={coffeeChat.start}
          endTime={coffeeChat.end}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        {(coffeeChat.suggestReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-of-mentor")}</span>
            <p className="text-box">{coffeeChat.suggestReason ?? coffeeChat.question}</p>
          </div>
        )}
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-to-mentor")}</span>
            <p className="text-box">{coffeeChat.applyReason ?? coffeeChat.question}</p>
          </div>
        )}
      </div>
    </>
  );
};
