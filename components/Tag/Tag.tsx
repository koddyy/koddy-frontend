import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

const variants = {
  "primary-dark": "bg-primary-dark",
  primary: "bg-primary",
};

type variantsType = keyof typeof variants;

interface TagProps {
  variant?: variantsType;
}

export const Tag = ({ variant = "primary", children }: PropsWithChildren<TagProps>) => {
  return (
    <span className={cn("label-bold rounded-[1.25rem] px-2 py-1 text-white", variants[variant])}>
      {children}
    </span>
  );
};
