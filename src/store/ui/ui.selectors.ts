import type { TUiStoreModel } from "./ui.types";

export const selectorUiIsSidebarOpen = (state: TUiStoreModel) => state.sidebarOpen;
export const selectorUiSetSidebarOpen = (state: TUiStoreModel) => state.setSidebarOpen;
export const selectorUiModal = (state: TUiStoreModel) => state.modal;
export const selectorUiOpenModal = (state: TUiStoreModel) => state.openModal;
export const selectorUiCloseModal = (state: TUiStoreModel) => state.closeModal;
export const selectorUiToastSuccess = (state: TUiStoreModel) => state.toastSuccess;
export const selectorUiToastWarning = (state: TUiStoreModel) => state.toastWarning;
export const selectorUiToastError = (state: TUiStoreModel) => state.toastError;
