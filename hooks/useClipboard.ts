import { useCallback } from "react";

interface CopyTextProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const useClipboard = () => {
  const copyText = useCallback(async (text: string, { onSuccess, onError }: CopyTextProps = {}) => {
    if (!navigator?.clipboard) {
      console.warn("clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      onSuccess?.();
      return true;
    } catch (e) {
      onError?.();
      return false;
    }
  }, []);

  return { copyText };
};

export default useClipboard;
