import {
  HTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "@/utils/cn";
import { FormOptions } from "./FormControl.type";
import { FormControlProvider, useFormControlContext } from "./FormControlContext";

export interface FormControlProps extends FormOptions, HTMLAttributes<HTMLDivElement> {}

const FormControl = ({ children, ...props }: PropsWithChildren<FormControlProps>) => {
  const uid = useId();
  const { id = uid, required, disabled, hasError, readOnly, ...rest } = props;
  const [hasCaption, setHasCaption] = useState(false);

  const value = useMemo(
    () => ({
      id,
      labelId: `${id}-label`,
      errorMessageId: `${id}-error-message`,
      captionId: `${id}-caption`,
      hasCaption,
      setHasCaption,
      required,
      disabled,
      hasError,
      readOnly,
    }),
    [id, hasCaption, required, disabled, hasError, readOnly]
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
      className={cn("body-3-bold mb-[6px] block", className)}
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
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => {
  const { errorMessageId, hasError } = useFormControlContext() ?? {};

  if (!hasError) return null;

  return (
    <span
      className={cn("body-3 mt-[6px] block text-danger", className)}
      id={errorMessageId}
      aria-live="polite"
      {...props}
    >
      {children}
    </span>
  );
};

const FormCaption = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => {
  const { captionId, setHasCaption } = useFormControlContext() ?? {};

  return (
    <span
      className={cn("body-3 mt-[6px] block text-gray-600", className)}
      id={captionId}
      ref={(node) => {
        if (node) {
          setHasCaption?.(true);
        }
      }}
      {...props}
    ></span>
  );
};

const FormGroup = ({ children, role = "group", ...props }: PropsWithChildren<FormControlProps>) => {
  const uid = useId();
  const {
    id = uid,
    required,
    disabled,
    hasError,
    readOnly,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDesribedby,
    ...rest
  } = props;
  const [hasCaption, setHasCaption] = useState(false);

  const value = useMemo(
    () => ({
      id,
      labelId: `${id}-label`,
      errorMessageId: `${id}-error-message`,
      captionId: `${id}-caption`,
      hasCaption,
      setHasCaption,
      required,
      disabled,
      hasError,
      readOnly,
    }),
    [id, hasCaption, required, disabled, hasError, readOnly]
  );

  return (
    <FormControlProvider value={value}>
      <div
        role={role}
        aria-labelledby={value.labelId ?? ariaLabelledby}
        aria-describedby={
          [
            ariaDesribedby,
            value.hasError && value.errorMessageId,
            value.hasCaption && value.captionId,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...rest}
      >
        {children}
      </div>
    </FormControlProvider>
  );
};

const FormGroupLabel = ({
  className,
  children,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => {
  const { labelId, required } = useFormControlContext() ?? {};

  return (
    <span
      id={props.id ?? labelId}
      className={cn("body-3-bold mb-[6px] block", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-danger" role="presentation" aria-hidden="true">
          *
        </span>
      )}
    </span>
  );
};

export { FormCaption, FormControl, FormErrorMessage, FormGroup, FormGroupLabel, FormLabel };
