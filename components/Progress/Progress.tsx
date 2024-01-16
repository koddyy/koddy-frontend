import { cva, VariantProps } from "cva";
import { cn } from "@/utils/cn";

const ProgressVariants = cva("rounded", {
  variants: {
    color: {
      primary: "bg-primary",
      secondary: "bg-secondary-dark",
    },
    tickness: {
      base: "h-[6px]",
      thin: "h-[4px]",
    },
  },
  defaultVariants: {
    color: "primary",
    tickness: "base",
  },
});

interface ProgressProps extends VariantProps<typeof ProgressVariants> {
  percent: number;
}

export const Progress = ({ percent, color = "primary", tickness = "base" }: ProgressProps) => {
  return (
    <div
      className={cn(
        "relative h-[6px] rounded bg-gray-200",
        ProgressVariants({ color: null, tickness })
      )}
    >
      <div
        className={cn("absolute rounded", ProgressVariants({ color, tickness }))}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
