import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useUiStore } from "@/store/ui/use-ui";
import { selectorUiCloseModal, selectorUiModal } from "@/store/ui/ui.selectors";

export function Modal() {
  const modal = useUiStore(selectorUiModal);
  const closeModal = useUiStore(selectorUiCloseModal);

  if (!modal) return null;

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    modal.onClose?.();
    closeModal();
  };

  return (
    <Dialog.Root
      open
      size={modal.size ?? "md"}
      onOpenChange={(details) => handleOpenChange(details.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {modal.title && (
              <Dialog.Header>
                <Dialog.Title>{modal.title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body>{modal.content}</Dialog.Body>
            {modal.footer && <Dialog.Footer>{modal.footer}</Dialog.Footer>}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
