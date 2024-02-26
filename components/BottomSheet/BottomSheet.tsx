import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Dimmed } from "@/components/Dimmed";
import { noop } from "@/utils/noop";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose?: (() => void) | null;
}

const OFFSET_THRESHOLD = 70;

export const BottomSheet = ({ isOpen, onClose, children }: PropsWithChildren<BottomSheetProps>) => {
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containterHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerHeight(rect.height);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Dimmed onClick={onClose ?? noop} />
          <div className="fixed bottom-0 left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2">
            <motion.div
              ref={containerRef}
              className="rounded-t-xl bg-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              style={{ y }}
              transition={{
                type: "spring",
                damping: 50,
                stiffness: 500,
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: containterHeight }}
              dragElastic={{ top: 0, bottom: 0.2 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > OFFSET_THRESHOLD) {
                  onClose?.();
                } else {
                  animate(y, 0);
                }
              }}
            >
              {onClose && (
                <div className="flex h-[24px] items-center justify-center">
                  <div className="h-[4px] w-[44px] rounded-[4px] bg-gray-300" />
                </div>
              )}
              <div className="px-[20px] py-[12px]">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export const ButtonArea = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-5 py-[11px]">{children}</div>;
};
