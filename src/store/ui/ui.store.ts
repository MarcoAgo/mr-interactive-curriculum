import { create } from "zustand";
import type { TToastOptions, TUiStoreModel } from "./ui.types";
import { toaster } from "@/components/ui/Toaster/_helpers/toaster-instance";

const normalizeToastOptions = (options: TToastOptions | string): TToastOptions =>
  typeof options === "string" ? { title: options } : options;

export const uiStore = create<TUiStoreModel>()((set) => ({
  sidebarOpen: false,
  modal: null,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toastSuccess: (options) => {
    const { title, description, duration, action } = normalizeToastOptions(options);
    // toaster.create must run after the current render commits, or Chakra's
    // toast portal can miss the update if triggered synchronously from an event handler.
    setTimeout(() => {
      toaster.create({ title, description, duration, action, type: "success", closable: true });
    }, 0);
  },
  toastWarning: (options) => {
    const { title, description, duration, action } = normalizeToastOptions(options);
    setTimeout(() => {
      toaster.create({ title, description, duration, action, type: "warning", closable: true });
    }, 0);
  },
  toastError: (options) => {
    const { title, description, duration, action } = normalizeToastOptions(options);
    setTimeout(() => {
      toaster.create({ title, description, duration, action, type: "error", closable: true });
    }, 0);
  },
  openModal: (options) => set({ modal: options }),
  closeModal: () => set({ modal: null }),
}));
