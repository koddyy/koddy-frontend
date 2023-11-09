import { PropsWithChildren } from "react";
import Close from "@/assets/close.svg";

export interface BottomSheetProps {
  onClose?: () => void;
}

export const BottomSheet = ({ onClose, children }: PropsWithChildren<BottomSheetProps>) => {
  return (
    <div className="rounded-t-xl bg-white">
      {onClose && (
        <div className="flex justify-end">
          <button className="p-5" type="button" onClick={onClose}>
            <Close />
          </button>
        </div>
      )}
      <div className="px-5">{children}</div>
    </div>
  );
};

export const ButtonArea = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-5 py-[0.69rem]">{children}</div>;
};
