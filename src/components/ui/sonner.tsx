"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "group toast",
          success:
            "!bg-green-500 !text-black !border-green-600 [&_[data-title]]:!text-black [&_[data-description]]:!text-black [&_[data-icon]]:!text-black [&_[data-close-button]]:!bg-black/20 [&_[data-close-button]]:!text-white [&_[data-close-button]]:!border-white/40 [&_[data-close-button]_svg]:!text-white",
        },
      }}
      {...props}
    />
  );
}
