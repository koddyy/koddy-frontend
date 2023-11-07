import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { FormOptions } from "@/components/FormControl/FormControl.type";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FormOptions {
  defaultValue?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftContent, rightContent, ...props }, ref) => {
    const { hasError, ...rest } = useFormControl(props);

    return (
      <div
        className={cn(
          "body-1 flex rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem] placeholder:text-gray-400 focus-within:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-danger",
          className
        )}
      >
        {leftContent}
        <input className="w-full outline-none" type={type} ref={ref} {...rest} />
        {rightContent}
      </div>
    );
  }
);

Input.displayName = "Input";
