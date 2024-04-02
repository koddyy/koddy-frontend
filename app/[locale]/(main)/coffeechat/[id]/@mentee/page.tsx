"use client";

import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { MentorProfile } from "@/components/UserProfile";
import { CoffeeChatDetails } from "./_details";

const Page = ({ params }: { params: { id: string } }) => {
  const constants = useTranslations("constants");

  const coffeeChatId = Number(params.id);
  const { data: coffeeChatDetails, isFetching } = useGetCoffeeChatById(coffeeChatId);
  const { coffeeChat, mentor } = coffeeChatDetails ?? {};

  if (!coffeeChat || !mentor || isFetching) return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatDetails id={coffeeChatId} status={coffeeChat.status} />
    </>
  );
};

export default Page;
