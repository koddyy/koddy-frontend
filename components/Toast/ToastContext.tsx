"use client";

import { createContext, useContext } from "react";
import { ToastProps } from "./types";

export type ToastContextValue = {
  open: (toastProps: ToastProps) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) throw new Error("should be used within ToastProvider");
  return context;
};
