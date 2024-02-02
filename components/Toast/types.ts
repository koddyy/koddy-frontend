export interface ToastProps {
  id: number;
  type?: "default" | "error";
  content?: string;
  onClose?: () => void;
}

export type UseToastProps = Omit<ToastProps, "id">;
