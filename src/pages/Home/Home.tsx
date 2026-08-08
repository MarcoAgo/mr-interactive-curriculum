import { Link } from "react-router";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ColorModeButton } from "@/components/ui/ColorMode";
import { useUiStore } from "@/store/ui/use-ui";
import {
  selectorUiCloseModal,
  selectorUiOpenModal,
  selectorUiToastSuccess,
} from "@/store/ui/ui.selectors";

export const Home = () => {
  const toastSuccess = useUiStore(selectorUiToastSuccess);
  const openModal = useUiStore(selectorUiOpenModal);
  const closeModal = useUiStore(selectorUiCloseModal);

  const handleOpenModal = () => {
    openModal({
      id: "welcome-modal",
      title: "Welcome",
      content: <p>This modal is driven entirely by the UI Zustand store.</p>,
    });
  };

  return (
    <div style={{ padding: "var(--spacing-xl)" }}>
      <ColorModeButton />
      <Card title="mr-fe-boilerplate">
        <p>Vite + React 19 + TypeScript + Chakra UI + Zustand + TanStack Query.</p>
        <Button onClick={() => toastSuccess("It works!")}>Trigger a toast</Button>
        <Button variant="secondary" onClick={handleOpenModal}>
          Open a modal
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Close modal
        </Button>
      </Card>
      <p>
        <Link to="/about">Go to About</Link>
      </p>
    </div>
  );
};
