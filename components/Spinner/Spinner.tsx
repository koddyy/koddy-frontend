import { cn } from "@/utils/cn";

interface SpinnerProps {
  color?: "primary" | "grayscale";
  size?: "lg" | "sm";
  className?: string;
}

export const Spinner = ({ color = "grayscale", size = "sm", className }: SpinnerProps) => {
  return (
    <div
      data-accent-color={color}
      data-size={size}
      className={cn("spinner animate-spin", className)}
    />
  );
};
