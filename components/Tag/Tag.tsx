import { cva, VariantProps } from "cva";
import { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/utils/cn";

const TagVariants = cva(
  "body-3-bold inline-block h-[32px] whitespace-nowrap rounded-[20px] px-[10px] py-[6px] text-gray-700",
  {
    variants: {
      variant: {
        solid: "",
        outline: "shadow-[0_0_0_1px_inset]",
      },
      color: {
        "primary-dark": "",
        primary: "",
        grayscale: "",
      },
    },
    compoundVariants: [
      { variant: "solid", color: "primary", className: "bg-primary text-white" },
      { variant: "solid", color: "primary-dark", className: "bg-primary-dark text-white" },
      { variant: "solid", color: "grayscale", className: "bg-gray-100 text-gray-700" },
      { variant: "outline", color: "primary", className: "text-gray-700 shadow-primary" },
      {
        variant: "outline",
        color: "primary-dark",
        className: "text-gray-700 shadow-primary-dark",
      },
      { variant: "outline", color: "grayscale", className: "text-gray-700 shadow-gray-300" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
    },
  }
);

export interface TagProps extends VariantProps<typeof TagVariants> {
  className?: string;
  onClick?: () => void;
  rightContent?: ReactNode;
}

export const Tag = ({
  className,
  variant = "solid",
  color = "primary",
  onClick,
  rightContent,
  children,
}: PropsWithChildren<TagProps>) => {
  return (
    <span
      className={cn(
        TagVariants({ variant, color }),
        onClick && "cursor-pointer",
        rightContent && "flex w-fit items-center gap-[2px]",
        className
      )}
      onClick={onClick}
    >
      {children}
      {rightContent}
    </span>
  );
};
