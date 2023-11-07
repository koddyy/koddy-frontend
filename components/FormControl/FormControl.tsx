import { HTMLAttributes, LabelHTMLAttributes, PropsWithChildren, useMemo } from "react";
import { cn } from "@/utils/cn";
import { FormControlContext, FormControlProvider, useFormControl } from "./FormControlContext";

export interface FormControlProps extends FormControlContext, HTMLAttributes<HTMLDivElement> {}

const FormControl = ({ className, children, ...props }: PropsWithChildren<FormControlProps>) => {
  const { id, required, disabled, hasError, readOnly, ...rest } = props;

  const value = useMemo(
    () => ({ id, required, disabled, hasError, readOnly }),
    [id, required, disabled, hasError, readOnly]
  );

  return (
    <FormControlProvider value={value}>
      <div className={cn("gap-[0.375rem]", className)} {...rest}>
        {children}
      </div>
    </FormControlProvider>
  );
};

const FormLabel = ({
  className,
  children,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => {
  const { id, required, ...rest } = useFormControl(props);

  return (
    <label htmlFor={id} className={cn("body-3-bold mb-[0.375rem]", className)} {...rest}>
      {children}
      {required && <span className="text-error"> *</span>}
    </label>
  );
};

const FormErrorMessage = ({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const { hasError, ...rest } = useFormControl(props);

  if (!hasError) return null;

  return (
    <span
      className={cn("mt-[0.375rem] text-[0.875rem] font-normal text-error", className)}
      {...rest}
    >
      {children}
    </span>
  );
};

export { FormControl, FormErrorMessage, FormLabel };
