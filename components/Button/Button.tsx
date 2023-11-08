import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

const colorVariants = {
  primary: "bg-primary",
  transparent: "bg-transparent",
};

type colorVariantsType = keyof typeof colorVariants;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
        "body-1-bold w-full cursor-pointer rounded-[0.625rem] p-3 text-white",
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
