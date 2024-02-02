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
      className="flex w-full items-center rounded bg-gray-100 shadow"
      data-state={isOpen ? "open" : "close"}
    >
      {type === "error" && <div className="text-danger">ERROR</div>}
      <span className="p-[10px]">{content}</span>
      {onClose && (
        <button className="ml-auto p-[10px] text-gray-700" type="button" onClick={close}>
          <Close width={16} height={16} />
        </button>
      )}
    </div>
  );
};
