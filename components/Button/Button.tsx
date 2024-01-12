import { cva, VariantProps } from "cva";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

const ButtonVariants = cva("cursor-pointer px-[12px] transition disabled:cursor-not-allowed", {
  variants: {
    variant: {
      solid: "bg-accent text-white hover:bg-accent-dark active:bg-accent disabled:bg-gray-400",
      outline: "border-2 border-accent text-accent",
      ghost: "bg-transparent text-accent",
    },
    color: {
      primary: "",
      grayscale: "",
    },
    size: {
      xs: "body-2 h-[21px] rounded-[8px]",
      sm: "body-2 h-[42px] rounded-[10px]",
      base: "body-1-bold h-[50px] rounded-[10px]",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      size: "xs",
      className: "border",
    },
    {
      variant: "outline",
      size: "sm",
      className: "border",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
  },
});

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof ButtonVariants> {
  fullWidth?: boolean;
}

export const Button = ({
  className,
  disabled = false,
  type = "button",
  variant = "solid",
  color = "primary",
  size = "base",
  fullWidth = true,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      data-accent-color={color}
      className={cn(ButtonVariants({ variant, color, size }), fullWidth && "w-full", className)}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
