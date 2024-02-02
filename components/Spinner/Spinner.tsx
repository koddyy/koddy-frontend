import { cn } from "@/utils/cn";

export const Spinner = ({ className }: { className?: string }) => {
  return <div className={cn("spinner animate-spin", className)} />;
};
