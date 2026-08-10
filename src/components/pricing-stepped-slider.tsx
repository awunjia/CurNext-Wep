"use client";

import { Minus, Plus } from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function PricingSteppedSlider({
  label,
  hint,
  value,
  min,
  max,
  step,
  marks,
  display,
  onChange,
  ariaLabel,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  marks: readonly number[];
  display: string;
  onChange: (value: number) => void;
  ariaLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium tracking-tight">{label}</p>
          {hint ? (
            <p className="text-muted-foreground mt-1 text-xs">{hint}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Decrease ${ariaLabel}`}
            onClick={() => onChange(clamp(value - step, min, max))}
            className="border-border/70 bg-background text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <p className="min-w-[4.5rem] text-center text-2xl font-semibold tracking-tight tabular-nums sm:min-w-[5.5rem] sm:text-3xl">
            {display}
          </p>
          <button
            type="button"
            aria-label={`Increase ${ariaLabel}`}
            onClick={() => onChange(clamp(value + step, min, max))}
            className="border-border/70 bg-background text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(next) => {
          const raw = Array.isArray(next) ? next[0] : next;
          if (typeof raw === "number") onChange(clamp(raw, min, max));
        }}
        aria-label={ariaLabel}
        className="w-full"
      />

      <div className="relative h-5">
        {marks.map((mark) => {
          const pct = ((mark - min) / (max - min)) * 100;
          return (
            <button
              key={mark}
              type="button"
              onClick={() => onChange(mark)}
              className={cn(
                "text-muted-foreground hover:text-foreground absolute top-0 -translate-x-1/2 text-[10px] tabular-nums transition-colors sm:text-xs",
                mark === value && "text-foreground font-medium",
              )}
              style={{ left: `${pct}%` }}
            >
              {mark}
            </button>
          );
        })}
      </div>
    </div>
  );
}
