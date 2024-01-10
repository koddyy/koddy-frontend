import { createContext, useContext } from "react";

export interface RadioContextProps {
  name: string;
  value?: string;
  onChangeValue?: (value: string) => void;
}

export const RadioContext = createContext<RadioContextProps | undefined>(undefined);

export const RadioProvider = RadioContext.Provider;

export const useRadioContext = () => {
  const context = useContext(RadioContext);

  if (!context) throw new Error("should be used in RadioContext Provider");

  return context;
};
