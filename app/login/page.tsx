"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";

const Page = () => {
  const {
    register,
    formState: { isValid },
  } = useForm();

  return (
    <form className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <div className="mb-[1.56rem] flex items-center justify-center">
          <img src="/images/illustration_welcome.png" />
        </div>
        <div className="mb-6 flex flex-col gap-4">
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input type="password" {...register("password", { required: true })} />
          </FormControl>
        </div>
        <div className="flex flex-col items-center gap-[0.88rem]">
          <Button type="submit" disabled={!isValid}>
            로그인
          </Button>
          <Link href="/signup" className="body-2-bold text-gray-500">
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Page;
