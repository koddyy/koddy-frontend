import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  defaultValue?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", hasError = false, leftContent, rightContent, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex rounded-[0.625rem] border border-gray-300 px-5 py-[0.6875rem] text-base text-gray-400 placeholder:text-gray-400 focus-within:ring-1 focus-within:ring-gray-400 focus-within:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "ring-1 ring-[#f87171] ring-offset-1",
          className
        )}
      >
        {leftContent}
        <input className="w-full outline-none" type={type} ref={ref} {...props} />
        {rightContent}
      </div>
    );
  }
);

Input.displayName = "Input";
