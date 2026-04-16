import { useMemo, useRef } from "react";
import type React from "react";

export function useSwipe(params: { onLeft?: () => void; onRight?: () => void; thresholdPx?: number }) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const thresholdPx = params.thresholdPx ?? 48;

  return useMemo(
    () => ({
      onPointerDown: (e: React.PointerEvent) => {
        startX.current = e.clientX;
        startY.current = e.clientY;
      },
      onPointerUp: (e: React.PointerEvent) => {
        if (startX.current == null || startY.current == null) return;
        const dx = e.clientX - startX.current;
        const dy = e.clientY - startY.current;
        startX.current = null;
        startY.current = null;

        if (Math.abs(dx) < thresholdPx) return;
        if (Math.abs(dy) > 80) return;

        if (dx < 0) params.onLeft?.();
        else params.onRight?.();
      },
    }),
    [params, thresholdPx],
  );
}
