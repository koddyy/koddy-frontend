"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useGetMenteeById } from "@/apis/user/hooks/useGetMenteeById";
import { ResultBottomSheet } from "@/app/[locale]/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button, LinkButton } from "@/components/Button";
import { FormControl, FormLabel } from "@/components/FormControl";
import { TextArea } from "@/components/TextArea";
import { useRouter } from "@/libs/navigation";
import { useSuggestCoffeeChat } from "../../../hooks/useSuggestCoffeeChat";

type MentorSuggestForm = {
  suggestReason: string;
};

const Page = ({ params }: { params: { id: string } }) => {
  const t = useTranslations();
  const menteeId = Number(params.id);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<MentorSuggestForm>();
  const { suggestCoffeeChat, isSuccess } = useSuggestCoffeeChat();
  const { data: mentee } = useGetMenteeById(menteeId);

  if (!mentee) return null;

  return (
    <>
      <NavigationBar title="커피챗 제안" onClickGoback={() => router.back()} />
      <form
        className="mt-[16px] px-[20px]"
        onSubmit={handleSubmit(({ suggestReason }) =>
          suggestCoffeeChat({ menteeId, suggestReason })
        )}
      >
        <FormControl>
          <FormLabel>멘티에게 궁금한 점 적기</FormLabel>
          <TextArea {...register("suggestReason", { required: true })} />
        </FormControl>
        <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-[20px] py-[11px]">
          <Button type="submit" disabled={!isValid}>
            제안하기
          </Button>
        </div>
      </form>
      {isSuccess && (
        <ResultBottomSheet
          resultType="positive"
          description={t("coffeechat.ResultBottomSheet.SUGGEST", { name: mentee.name })}
          confirmButton={
            <LinkButton href="/">{t("coffeechat.ResultBottomSheet.return-home")}</LinkButton>
          }
        />
      )}
    </>
  );
};

export default Page;
