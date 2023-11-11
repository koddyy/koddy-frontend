"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLogin } from "@/api/user/hooks/useLogin";
import { Button } from "@/components/Button";
import { FormControl, FormErrorMessage, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";

const Page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm<{ email: string; password: string }>();
  const router = useRouter();
  const { mutate: login } = useLogin();

  const handleLogin = (data: { email: string; password: string }) => {
    login(data, {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (error) => {
        setError("email", error);
        setError("password", error);
      },
    });
  };

  return (
    <form
      className="flex min-h-screen items-center justify-center"
      onSubmit={handleSubmit(handleLogin)}
    >
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
            <FormErrorMessage>이메일 혹은 비밀번호가 틀렸습니다.</FormErrorMessage>
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
