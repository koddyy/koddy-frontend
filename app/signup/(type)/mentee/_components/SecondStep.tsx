import { useForm } from "react-hook-form";
import { BottomButton } from "@/app/_components/BottomButton";
import { ProfileImageUpload } from "@/app/_components/ProfileImageUpload";
import type { SecondStepForm } from "@/app/signup/types/menteeForm";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";

type SecondStepSubmitForm = SecondStepForm & { image: FileList };

interface SecondStepProps {
  onClickNextStep: (data: SecondStepForm) => void;
}

export const SecondStep = ({ onClickNextStep }: SecondStepProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<SecondStepSubmitForm>();

  const watchImage = watch("image");

  return (
    <form
      className="mb-[0.81rem] mt-[1.44rem] flex flex-col gap-4"
      onSubmit={handleSubmit(onClickNextStep)}
    >
      <div className="mb-5">
        <ProfileImageUpload
          register={register("image", { required: true })}
          watchImage={watchImage}
        />
      </div>
      <FormControl required>
        <FormLabel htmlFor="name">이름</FormLabel>
        <Input
          {...register("name", {
            required: true,
          })}
        />
      </FormControl>
      <FormControl required>
        <FormLabel htmlFor="school">관심 학교</FormLabel>
        <Input
          {...register("school", {
            required: true,
          })}
        />
      </FormControl>
      <FormControl required>
        <FormLabel htmlFor="major">관심 전공</FormLabel>
        <Input
          {...register("major", {
            required: true,
          })}
        />
      </FormControl>
      <BottomButton type="submit" disabled={!isValid}>
        다음
      </BottomButton>
    </form>
  );
};
