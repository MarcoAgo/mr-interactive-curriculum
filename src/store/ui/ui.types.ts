import type { ReactNode } from "react";

export interface TToastAction {
  label: string;
  onClick: () => void;
}

export interface TToastOptions {
  title: string;
  description?: string;
  duration?: number;
  action?: TToastAction;
}

export interface TModalOptions {
  id: string;
  title?: string;
  content: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClose?: () => void;
  contentClassName?: string;
  backdropClassName?: string;
  bodyClassName?: string;
  hideCloseButton?: boolean;
  motionPreset?: "scale" | "slide-in-bottom" | "slide-in-top" | "slide-in-left" | "slide-in-right" | "none";
}

export interface TUiStoreModel {
  sidebarOpen: boolean;
  modal: TModalOptions | null;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  toastSuccess: (options: TToastOptions | string) => void;
  toastWarning: (options: TToastOptions | string) => void;
  toastError: (options: TToastOptions | string) => void;
  openModal: (options: TModalOptions) => void;
  closeModal: () => void;
}
