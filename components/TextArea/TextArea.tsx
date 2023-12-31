import { forwardRef, TextareaHTMLAttributes } from "react";
import { useFormControl } from "@/components/FormControl/FormControlContext";
import { cn } from "@/utils/cn";

const heights = {
  sm: "h-28",
  base: "h-[14rem]",
};

type HeightsType = keyof typeof heights;

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  height?: HeightsType;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, height = "base", ...props }, ref) => {
    const { hasError, ...rest } = useFormControl(props);

    return (
      <textarea
        className={cn(
          "body-1 h-28 w-full resize-none rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem] outline-none placeholder:text-gray-400 focus:border-gray-400",
          heights[height],
          hasError && "border-error focus:border-error",
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

TextArea.displayName = "TextArea";
