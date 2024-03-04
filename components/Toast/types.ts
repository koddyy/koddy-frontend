export interface ToastProps {
  id: number;
  type?: "default" | "error";
  content?: string;
  onClose?: () => void;
  delay?: number;
}

export type UseToastProps = Omit<ToastProps, "id">;
