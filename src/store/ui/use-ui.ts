import { uiStore } from "./ui.store";
import type { TUiStoreModel } from "./ui.types";

export const useUiStore = <T>(selector: (state: TUiStoreModel) => T): T => uiStore(selector);
