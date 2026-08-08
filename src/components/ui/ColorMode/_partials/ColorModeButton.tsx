import type { IconButtonProps } from "@chakra-ui/react";
import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode } from "../ColorMode";

type ColorModeButtonProps = Omit<IconButtonProps, "aria-label">;

export function ColorModeButton(props: ColorModeButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        {...props}
      >
        {colorMode === "dark" ? <LuMoon /> : <LuSun />}
      </IconButton>
    </ClientOnly>
  );
}
