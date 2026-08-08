import { ThemeProvider, useTheme } from "next-themes";
import type { ColorMode, ColorModeProviderProps, UseColorModeReturn } from "./ColorMode.types";

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = (forcedTheme ?? resolvedTheme) as ColorMode;
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return { colorMode, setColorMode: setTheme, toggleColorMode };
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}
