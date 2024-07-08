import React, { HTMLAttributes } from "react";
import type { FormOptions } from "./FormControl.type";

interface FormControlContext extends FormOptions {
  id: string;
  labelId: string;
  errorMessageId: string;
}

const createFormControlContext = () => {
  const Context = React.createContext<FormControlContext | undefined>(undefined);
  const Provider = Context.Provider;

  const useContext = () => {
    return React.useContext(Context);
  };

  return [Provider, useContext] as const;
};

const [FormControlProvider, useFormControlContext] = createFormControlContext();

interface UseFormControl<T extends HTMLElement> extends FormOptions, HTMLAttributes<T> {}

const useFormControl = <T extends HTMLElement>(props: UseFormControl<T> = {}) => {
  const context = useFormControlContext();
  const {
    id = context?.id,
    required = context?.required,
    disabled = context?.disabled,
    hasError = context?.hasError,
    readOnly = context?.readOnly,
    "aria-labelledby": ariaLabelledbyProp,
    ...rest
  } = props;

  const ariaLabelledby = context?.labelId ?? ariaLabelledbyProp;

  const ariaDesribedby =
    [props["aria-describedby"], context?.hasError && context.errorMessageId]
      .filter(Boolean)
      .join(" ") || undefined;

  return {
    ...rest,
    id,
    required,
    disabled,
    hasError,
    readOnly,
    "aria-required": required,
    "aria-disabled": disabled,
    "aria-invalid": hasError,
    "aria-readonly": readOnly,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDesribedby,
  };
};

export type { FormControlContext };
export { FormControlProvider, useFormControl, useFormControlContext };
