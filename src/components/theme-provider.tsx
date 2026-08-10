"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * next-themes injects an inline <script> to avoid theme flash.
 * React 19 / Next 16 warn when that script is rendered from a Client
 * Component. Keep a real script on the server; on the client use a
 * non-executable type so React does not flag it.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
