"use client";

import {
  Turnstile,
  type TurnstileInstance,
  type TurnstileProps,
} from "@marsidev/react-turnstile";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type TurnstileWidgetHandle = {
  reset: () => void;
};

type TurnstileWidgetProps = {
  onSuccess?: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
  options?: TurnstileProps["options"];
};

export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  TurnstileWidgetProps
>(function TurnstileWidget(
  { onSuccess, onExpire, onError, className, options },
  ref,
) {
  const widgetRef = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset: () => widgetRef.current?.reset(),
  }));

  if (!siteKey) {
    return (
      <p className="text-muted-foreground text-sm">
        Turnstile is not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
      </p>
    );
  }

  return (
    <div className={className}>
      <Turnstile
        ref={widgetRef}
        siteKey={siteKey}
        onSuccess={onSuccess}
        onExpire={onExpire}
        onError={onError}
        options={{
          theme: "auto",
          // "normal" is widely supported; "flexible" can trigger Turnstile 400020
          // on some widget/sitekey combinations (incl. localhost).
          size: "normal",
          ...options,
        }}
      />
    </div>
  );
});
