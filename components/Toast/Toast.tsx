"use client";

import { useState } from "react";
import AttentionCircle from "@/assets/attention-circle.svg";
import Close from "@/assets/close.svg";
import { cn } from "@/utils/cn";
import { ToastProps } from "./types";

export const Toast = ({ type = "default", content, onClose }: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const close = async () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div
      className={cn(
        "flex w-full items-start bg-gray-200 px-[20px] py-[14px]",
        type === "error" && "bg-[#FED8DC] text-danger"
      )}
      data-state={isOpen ? "open" : "close"}
    >
      {type === "error" && (
        <div className="mr-[10px]">
          <AttentionCircle width={24} height={24} />
        </div>
      )}
      <span className="mr-[31px]">{content}</span>
      {onClose && (
        <button className="ml-auto" type="button" onClick={close}>
          <Close width={24} height={24} />
        </button>
      )}
    </div>
  );
};
