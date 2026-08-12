import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { useUiStore } from "@/store/ui/use-ui";
import { selectorUiCloseModal, selectorUiModal } from "@/store/ui/ui.selectors";
import type { TModalOptions } from "@/store/ui/ui.types";

export function Modal() {
  const modal = useUiStore(selectorUiModal);
  const closeModal = useUiStore(selectorUiCloseModal);
  const [lastModal, setLastModal] = useState<TModalOptions | null>(null);

  // Keep the last non-null options mounted through the close transition, so
  // Dialog.Content still has content to render while its exit animation plays.
  if (modal && modal !== lastModal) {
    setLastModal(modal);
  }

  if (!lastModal) return null;

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    lastModal.onClose?.();
    closeModal();
  };

  return (
    <Dialog.Root
      open={!!modal}
      motionPreset={lastModal.motionPreset}
      onExitComplete={() => setLastModal(null)}
      size={lastModal.size ?? "md"}
      onOpenChange={(details) => handleOpenChange(details.open)}
    >
      <Portal>
        <Dialog.Backdrop className={lastModal.backdropClassName} />
        <Dialog.Positioner>
          <Dialog.Content className={lastModal.contentClassName}>
            {lastModal.title && (
              <Dialog.Header>
                <Dialog.Title>{lastModal.title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body className={lastModal.bodyClassName}>{lastModal.content}</Dialog.Body>
            {lastModal.footer && <Dialog.Footer>{lastModal.footer}</Dialog.Footer>}
            {!lastModal.hideCloseButton && (
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
