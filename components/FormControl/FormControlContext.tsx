import React, { HTMLAttributes } from "react";
import type { FormOptions } from "./FormControl.type";

interface FormControlContext extends FormOptions {
  id?: string;
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

const useFormControl = <T extends HTMLElement>(props?: UseFormControl<T>) => {
  const { required, disabled, hasError, readOnly, ...rest } = props ?? {};
  const context = useFormControlContext();

  return {
    ...rest,
    required: required ?? context?.required,
    disabled: disabled ?? context?.disabled,
    hasError: hasError ?? context?.hasError,
    readOnly: readOnly ?? context?.readOnly,
  };
};

export type { FormControlContext };
export { FormControlProvider, useFormControl, useFormControlContext };
