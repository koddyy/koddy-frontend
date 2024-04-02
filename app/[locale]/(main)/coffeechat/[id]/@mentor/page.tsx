"use client";

import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { MenteeProfile } from "@/components/UserProfile";
import { CoffeeChatDetails } from "./_details";

const Page = ({ params }: { params: { id: string } }) => {
  const constants = useTranslations("constants");

  const coffeeChatId = Number(params.id);
  const { data: coffeeChatDetails, isFetching } = useGetCoffeeChatById(coffeeChatId);
  const { coffeeChat, mentee } = coffeeChatDetails ?? {};

  if (!coffeeChat || !mentee || isFetching) return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatDetails id={coffeeChatId} status={coffeeChat.status} />
    </>
  );
};

export default Page;
