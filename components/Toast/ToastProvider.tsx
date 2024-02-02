"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";
import { ToastProps } from "./types";

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Array<ToastProps>>([]);

  const add = (toast: ToastProps) => {
    // setToasts((prev) => [...prev, toast]);
    setToasts([toast]);
  };

  const remove = (id: number) => {
    return () => {
      setToasts((prev) => prev.filter((e) => e.id !== id));
    };
  };

  const context = useMemo(() => ({ open: add }), []);

  return (
    <ToastContext.Provider value={context}>
      {children}
      <div className="absolute inset-x-[30px] top-[50px] z-highest flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} onClose={remove(toast.id)} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
