"use client";

import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { MentorView } from "./MentorView";

const Page = ({ params }: { params: { id: string } }) => {
  const coffeeChatId = Number(params.id);
  const { data: coffeeChatDetail, isFetching } = useGetCoffeeChatById(coffeeChatId);
  const { coffeeChat } = coffeeChatDetail ?? {};

  if (!coffeeChat || isFetching) return null;

  const CoffeeChatDetail = MentorView[coffeeChat.status];

  return <CoffeeChatDetail id={coffeeChatId} />;
};

export default Page;
