"use client";

import { useRouter } from "next/navigation";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { ResultBottomSheet } from "@/app/(home)/coffeechat/_components/ResultBottomSheet/ResultBottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { TextArea } from "@/components/TextArea";
import { Toggle } from "@/components/Toggle";
import { cn } from "@/utils/cn";
import useReserveCoffeeChat from "./_hooks/useReserveCoffeeChat";

type FirstStepData = {
  date: Date;
  time: string;
};

type SecondStepData = {
  question: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FirstStepData | SecondStepData>();
  const { isReserved, reserveCoffeeChat } = useReserveCoffeeChat();

  const handleClickGoback = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  const handleClickNextStep = (data: FirstStepData) => {
    setCurrentStep((prev) => prev + 1);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmitReservation = (data: SecondStepData) => {
    // TODO: mutate
    console.log({ ...formData, ...data });
    reserveCoffeeChat();
  };

  return (
    <>
      <NavigationBar title="멘토링 신청" onClickGoback={handleClickGoback} />
      <div className="px-5 pb-40 pt-4">
        {currentStep === 1 && <Schedule onClickNextStep={handleClickNextStep} />}
        {currentStep === 2 && <Question onSubmitReservation={handleSubmitReservation} />}
      </div>
      {isReserved && (
        <ResultBottomSheet
          resultType="positive"
          description={["OOO님과의", "커피챗이 신청되었습니다."]}
          confirmButton={<LinkButton href="/">예약 페이지로 가기</LinkButton>}
        />
      )}
    </>
  );
};

interface ScheduleProps {
  onClickNextStep: (data: FirstStepData) => void;
}

const Schedule = ({ onClickNextStep }: ScheduleProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FirstStepData>();

  const currentTime = new Intl.DateTimeFormat("ko", { timeStyle: "short" }).format(new Date());

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onClickNextStep)}>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">날짜 선택</FormLabel>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <div className="border border-gray-200">
              <Calendar
                disabledDays={[0, 2, 3, 5, 6, 7]}
                value={field.value}
                onChange={(value: Nullable<Date>) => field.onChange(value)}
              />
            </div>
          )}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">시간 선택</FormLabel>
        <Controller
          control={control}
          name="time"
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {["11:00 ~ 11:30", "11:30 ~ 12:00", "12:00 ~ 12:30"].map((value, i) => (
                <Toggle
                  key={i}
                  className={cn(field.value === value && "bg-[#DCFEEB] text-gray-600")}
                  pressed={field.value === value}
                  onChangePressed={() => field.onChange(value)}
                >
                  {value}
                </Toggle>
              ))}
            </div>
          )}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <Divider />
      <div className="body-3-bold mb-[2.12rem] flex items-center gap-1 text-gray-600">
        <img className="h-4 w-4" src="/images/earth.png" />
        <div>현재 한국 시간 기준 {currentTime}</div>
      </div>
      <div className="fixed bottom-[5.75rem] left-1/2 z-header w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white">
        <div className="px-[1.25rem] py-[0.69rem]">
          <Button type="submit" disabled={!isValid}>
            다음
          </Button>
        </div>
      </div>
    </form>
  );
};

interface QuestionProps {
  onSubmitReservation: (data: SecondStepData) => void;
}

const Question = ({ onSubmitReservation }: QuestionProps) => {
  const { register, handleSubmit } = useForm<SecondStepData>();

  return (
    <form onSubmit={handleSubmit(onSubmitReservation)}>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">멘토에게 궁금한 점 적기</FormLabel>
        <TextArea {...register("question")} />
      </FormControl>
      <div className="fixed bottom-[5.75rem] left-1/2 z-header w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white">
        <div className="px-[1.25rem] py-[0.69rem]">
          <Button type="submit">신청하기</Button>
        </div>
      </div>
    </form>
  );
};

export default Page;
