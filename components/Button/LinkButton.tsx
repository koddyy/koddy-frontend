import { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { Link } from "@/libs/navigation";
import { cn } from "@/utils/cn";

interface LinkButtonProps extends Omit<LinkProps, "locale"> {
  className?: string;
}

export const LinkButton = ({
  className,
  children,
  ...props
}: PropsWithChildren<LinkButtonProps>) => {
  return (
    <Link
      className={cn(
        "body-1-bold w-full cursor-pointer rounded-[0.625rem] bg-primary p-3 text-center text-white",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
