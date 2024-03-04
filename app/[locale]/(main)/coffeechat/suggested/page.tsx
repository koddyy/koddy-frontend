"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Spinner } from "@/components/Spinner";
import { useRouter } from "@/libs/navigation";
import {
  CoffeeChatCardListWithMentee,
  CoffeeChatCardListWithMentor,
} from "../components/CoffeeChatCardList";

const title = {
  mentor: "제안한 커피챗",
  mentee: "커피챗 제안",
} as const;

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMe();

  if (!me) return null;

  return (
    <>
      <NavigationBar
        title={title[me.role]}
        titleFontWeight="regular"
        onClickGoback={() => router.back()}
      />
      <div className="px-[20px] py-[16px]">
        <SSRSafeSuspense fallback={<Spinner className="mx-auto mt-[46px]" />}>
          {me.role === "mentor" && <CoffeeChatCardListWithMentee category="suggested" />}
          {me.role === "mentee" && <CoffeeChatCardListWithMentor category="suggested" />}
        </SSRSafeSuspense>
      </div>
    </>
  );
};

export default Page;
