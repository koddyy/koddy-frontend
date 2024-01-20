import { cva, VariantProps } from "cva";
import { PropsWithChildren } from "react";

const TagVariants = cva("label rounded-[20px] px-[10px] py-[6px] text-gray-700", {
  variants: {
    variant: {
      solid: "",
      outline: "border",
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
    { variant: "outline", color: "primary", className: "border-primary text-gray-700" },
    { variant: "outline", color: "primary-dark", className: "border-primary-dark text-gray-700" },
    { variant: "outline", color: "grayscale", className: "border-gray-300 text-gray-700" },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
  },
});

interface TagProps extends VariantProps<typeof TagVariants> {}

export const Tag = ({
  variant = "solid",
  color = "primary",
  children,
}: PropsWithChildren<TagProps>) => {
  return <span className={TagVariants({ variant, color })}>{children}</span>;
};
