import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

const colorVariants = {
  primary: "bg-primary",
  transparent: "bg-transparent",
};

type colorVariantsType = keyof typeof colorVariants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorVariant?: colorVariantsType;
}

export const Button = ({
  className,
  disabled = false,
  type = "button",
  colorVariant = "primary",
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(
        "w-full cursor-pointer rounded-[0.625rem] p-5 text-xl font-bold leading-6 text-gray-100",
        colorVariants[colorVariant],
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
