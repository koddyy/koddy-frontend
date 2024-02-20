"use client";

import { isAxiosError } from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiInstance } from "@/apis/axios";
import { Button } from "@/components/Button";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { useAuthStore } from "@/stores/auth";

interface LoginForm {
  email: string;
  password: string;
}
const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { setAccessToken } = useAuthStore();

  const login = async (data: LoginForm) => {
    try {
      const response = await apiInstance.post("/api/auth/dummy/login", data);
      const { accessToken, refreshToken } = response.data.token;
      setCookie("refresh_token", refreshToken);
      setAccessToken(accessToken);
      router.push("/");
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        setErrorMessage(e.response.data.message);
      }
    }
  };

  return (
    <form className="mt-[120px] flex flex-col gap-[12px] px-[20px]" onSubmit={handleSubmit(login)}>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input type="email" {...register("email", { required: true })} />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input {...register("password", { required: true })} />
      </FormControl>
      <div className="mt-[32px]">
        <Button type="submit" disabled={!isValid}>
          로그인
        </Button>
      </div>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </form>
  );
};

export default Page;
