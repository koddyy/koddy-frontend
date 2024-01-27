import { cn } from "@/utils/cn";

interface DividerProps {
  className?: string;
  direction?: "horizontal" | "vertical";
}

export const Divider = ({ className, direction = "horizontal" }: DividerProps) => {
  return (
    <hr
      className={cn(
        "border-[0.5px] border-gray-100",
        direction === "vertical" && "h-full w-[1px]",
        className
      )}
    />
  );
};
