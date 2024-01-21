import { cva, VariantProps } from "cva";
import { PropsWithChildren } from "react";

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

interface TagProps extends VariantProps<typeof TagVariants> {}

export const Tag = ({
  variant = "solid",
  color = "primary",
  children,
}: PropsWithChildren<TagProps>) => {
  return <span className={TagVariants({ variant, color })}>{children}</span>;
};
