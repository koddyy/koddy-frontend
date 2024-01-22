import { useFormContext } from "react-hook-form";
import { Button } from "@/components/Button";
import { FormControl, FormLabel } from "@/components/FormControl";
import { TextArea } from "@/components/TextArea";
import { MenteeApplyForm } from "@/types/coffeechat";

export const QuestionStep = () => {
  const { register } = useFormContext<Pick<MenteeApplyForm, "question">>();

  return (
    <>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">멘토에게 궁금한 점 적기</FormLabel>
        <TextArea {...register("question")} />
      </FormControl>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-header w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white">
        <div className="px-[1.25rem] py-[0.69rem]">
          <Button type="submit">신청하기</Button>
        </div>
      </div>
    </>
  );
};