"use client";

import { useState } from "react";
import Close from "@/assets/close.svg";
import { ToastProps } from "./types";

export const Toast = ({ type = "default", content, onClose }: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const close = async () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div
      className="flex w-full items-center rounded bg-gray-200 p-[10px] shadow-lg"
      data-state={isOpen ? "open" : "close"}
    >
      {type === "error" && <div className="mr-[10px] text-danger">ERROR</div>}
      <span>{content}</span>
      {onClose && (
        <button className="ml-auto p-[10px] text-gray-700" type="button" onClick={close}>
          <Close width={16} height={16} />
        </button>
      )}
    </div>
  );
};
