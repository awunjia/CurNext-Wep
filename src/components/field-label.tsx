import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FieldLabelProps = {
  htmlFor?: string;
  required?: boolean;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
};

export function FieldLabel({
  htmlFor,
  required = false,
  icon: Icon,
  children,
  className,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="label"
      className={cn(
        "flex items-center gap-1.5 text-sm leading-none font-medium select-none",
        className,
      )}
    >
      {Icon ? (
        <Icon className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
      ) : null}
      <span>{children}</span>
      {required ? (
        <span className="text-destructive" aria-hidden="true">
          *
        </span>
      ) : null}
      {required ? <span className="sr-only">(required)</span> : null}
    </label>
  );
}
