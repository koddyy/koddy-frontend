import { cn } from "@/utils/cn";

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return <hr className={cn("border-gray-200", className)} />;
};
