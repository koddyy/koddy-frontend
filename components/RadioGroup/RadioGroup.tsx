import { Children, isValidElement, PropsWithChildren, useMemo } from "react";
import { cn } from "@/utils/cn";
import { FormControlProps, FormGroup, FormGroupLabel } from "../FormControl";
import { useFormControl } from "../FormControl/FormControlContext";
import { RadioContext, type RadioContextProps } from "./Radio.context";

export interface RadioGroupProps extends RadioContextProps, FormControlProps {
  direction?: "vertical" | "horizontal";
}

export const RadioGroup = ({
  name,
  value,
  onChangeValue,
  direction,
  children,
  ...props
}: PropsWithChildren<RadioGroupProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasError, ...formControl } = useFormControl(props);
  const context = useMemo(() => ({ name, value, onChangeValue }), [name, value, onChangeValue]);

  const formGroupLabelChild = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === FormGroupLabel
  );

  const restChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type !== FormGroupLabel
  );

  return (
    <RadioContext.Provider value={context}>
      <FormGroup role="radiogroup" {...formControl} {...props}>
        {formGroupLabelChild}
        <div className={cn("flex gap-[14px]", direction === "vertical" && "flex-col")}>
          {restChildren}
        </div>
      </FormGroup>
    </RadioContext.Provider>
  );
};
