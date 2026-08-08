import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { ColorModeProvider } from "../ColorMode";
import type { ProviderProps } from "./Provider.types";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
  },
});

const customSystem = createSystem(defaultConfig, config);

export function Provider(props: ProviderProps) {
  return (
    <ChakraProvider value={customSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
