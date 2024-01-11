import { cva, VariantProps } from "cva";
import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export const ToggleVariants = cva("border-primary", {
  variants: {
    variant: {
      solid: "bg-primary font-bold text-white",
      surface: "bg-[#DCFEEB]",
      outline: "",
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});

export interface ToggleProps extends VariantProps<typeof ToggleVariants> {
  className?: string;
  pressed?: boolean;
  onChangePressed?: () => void;
}

export const Toggle = ({
  className,
  variant = "solid",
  pressed,
  onChangePressed,
  children,
}: PropsWithChildren<ToggleProps>) => {
  return (
    <button
      type="button"
      className={cn(
        "body-2 rounded-[10px] border border-gray-300 px-[13px] py-[11px]",
        pressed && ToggleVariants({ variant }),
        className
      )}
      onClick={onChangePressed}
    >
      {children}
    </button>
  );
};
