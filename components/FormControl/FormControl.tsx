import { HTMLAttributes, LabelHTMLAttributes, PropsWithChildren, useId, useMemo } from "react";
import { cn } from "@/utils/cn";
import { FormOptions } from "./FormControl.type";
import { FormControlProvider, useFormControlContext } from "./FormControlContext";

export interface FormControlProps extends FormOptions, HTMLAttributes<HTMLDivElement> {}

const FormControl = ({ children, ...props }: PropsWithChildren<FormControlProps>) => {
  const uid = useId();
  const { id = uid, required, disabled, hasError, readOnly, ...rest } = props;

  const value = useMemo(
    () => ({
      id,
      labelId: `${id}-label`,
      errorMessageId: `${id}-error-message`,
      required,
      disabled,
      hasError,
      readOnly,
    }),
    [id, required, disabled, hasError, readOnly]
  );

  return (
    <FormControlProvider value={value}>
      <div {...rest}>{children}</div>
    </FormControlProvider>
  );
};

const FormLabel = ({
  className,
  children,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => {
  const { id, labelId, required } = useFormControlContext() ?? {};

  return (
    <label
      htmlFor={props.htmlFor ?? id}
      id={props.id ?? labelId}
      className={cn("body-3-bold mb-[6px] inline-block", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-danger" role="presentation" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
};

const FormErrorMessage = ({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const { errorMessageId, hasError } = useFormControlContext() ?? {};

  if (!hasError) return null;

  return (
    <span
      className={cn("body-3 mt-[6px] inline-block text-danger", className)}
      id={errorMessageId}
      aria-live="polite"
      {...props}
    >
      {children}
    </span>
  );
};

export { FormControl, FormErrorMessage, FormLabel };
