"use client";

import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { MenteeView } from "./MenteeView";

const Page = ({ params }: { params: { id: string } }) => {
  const coffeeChatId = Number(params.id);
  const { data: coffeeChatDetail, isFetching } = useGetCoffeeChatById(coffeeChatId);
  const { coffeeChat } = coffeeChatDetail ?? {};

  if (!coffeeChat || isFetching) return null;

  const CoffeeChatDetail = MenteeView[coffeeChat.status];

  return <CoffeeChatDetail id={coffeeChatId} />;
};

export default Page;
