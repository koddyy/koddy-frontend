import { PropsWithChildren, useMemo } from "react";
import { FormControlProps, FormGroup } from "../FormControl";
import { useFormControl } from "../FormControl/FormControlContext";
import { RadioContext, type RadioContextProps } from "./Radio.context";

export interface RadioGroupProps extends RadioContextProps, FormControlProps {}

export const RadioGroup = ({
  name,
  value,
  onChangeValue,
  children,
  ...props
}: PropsWithChildren<RadioGroupProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasError, ...formControl } = useFormControl(props);
  const context = useMemo(() => ({ name, value, onChangeValue }), [name, value, onChangeValue]);

  return (
    <RadioContext.Provider value={context}>
      <FormGroup role="radiogroup" {...formControl} {...props}>
        {children}
      </FormGroup>
    </RadioContext.Provider>
  );
};
