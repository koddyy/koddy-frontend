import { PropsWithChildren } from "react";
import Close from "@/assets/close.svg";
import { Dimmed } from "@/components/Dimmed";

export interface BottomSheetProps {
  onClose?: () => void;
}

export const BottomSheet = ({ onClose, children }: PropsWithChildren<BottomSheetProps>) => {
  return (
    <>
      <Dimmed onClick={onClose} />
      <div className="fixed bottom-[5.75rem] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2">
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
      </div>
    </>
  );
};

export const ButtonArea = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-5 py-[0.69rem]">{children}</div>;
};
