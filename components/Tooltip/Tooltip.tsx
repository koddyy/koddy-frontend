import { cva, VariantProps } from "cva";
import { PropsWithChildren, ReactElement } from "react";
import { cn } from "@/utils/cn";

const PositioinVariants = cva("", {
  variants: {
    position: {
      "top-center": "bottom-[calc(100%+3px)] left-1/2 -translate-x-1/2",
      "bottom-center": "left-1/2 top-[calc(100%+3px)] -translate-x-1/2",
    },
  },
});

interface TooltipProps extends VariantProps<typeof PositioinVariants> {
  content: string | ReactElement;
  open?: boolean;
}

export const Tooltip = ({
  content,
  open = true,
  position = "top-center",
  children,
}: PropsWithChildren<TooltipProps>) => {
  return open ? (
    <div className="relative">
      {children}
      <div className={cn("absolute", PositioinVariants({ position }))}>
        <div className="relative z-tooltip w-fit">
          {typeof content === "string" ? (
            <>
              <div className="body-3 rounded-lg bg-gray-600 p-2 text-gray-100 shadow-md">
                {content}
              </div>
              <svg
                className="absolute bottom-[-8px] left-1/2 -translate-x-1/2"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
              >
                <path
                  d="M1.09258 2.11419L5.1107 9.92768C5.4828 10.6512 6.5172 10.6512 6.8893 9.92768L10.9074 2.11419C11.2497 1.44869 10.7665 0.656867 10.0181 0.656867L1.98188 0.656867C1.23354 0.656867 0.750346 1.44869 1.09258 2.11419Z"
                  fill="#4B4B4B"
                />
              </svg>
            </>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  ) : (
    children
  );
};
