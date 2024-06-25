import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { TextArea } from "@/components/TextArea";
import { MenteeApplyForm } from "@/types/coffeechat";

export const QuestionStep = () => {
  const t = useTranslations("schedule.QuestionStep");

  const {
    register,
    formState: { isValid },
  } = useFormContext<Pick<MenteeApplyForm, "question">>();

  return (
    <>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">{t("question-to-mentor")}</FormLabel>
        <TextArea {...register("question", { required: true })} />
      </FormControl>
      <BottomButton type="submit" disabled={!isValid}>
        {t("request")}
      </BottomButton>
    </>
  );
};
