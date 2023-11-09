import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

const variants = {
  solid: "bg-primary",
  outline: "border-2 border-primary bg-transparent text-primary",
};

type variantsType = keyof typeof variants;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variantsType;
}

export const Button = ({
  className,
  disabled = false,
  type = "button",
  variant = "solid",
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(
        "body-1-bold w-full cursor-pointer rounded-[0.625rem] p-3 text-white",
        variants[variant],
        disabled && "cursor-not-allowed bg-gray-400",
        className
      )}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
