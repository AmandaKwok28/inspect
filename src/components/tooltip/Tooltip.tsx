/**
 * Provides the outer container for the inspector tooltip.
 * Handles positioning, scaling, appearance, and pointer events.
 */

import type { ReactNode } from "react";
import type { Theme } from "../../lib/settings";
import { useTooltipPosition } from "../../hooks/useTooltipPosition";

type Props = {
  top: number;
  left: number;
  zoom: number;
  theme: Theme;
  isLocked: boolean;
  children: ReactNode;
};

export default function Tooltip({
  top,
  left,
  zoom,
  theme,
  isLocked,
  children,
}: Props) {
  const tooltipRef = useTooltipPosition(top, left, zoom);

  return (
    <div
      ref={tooltipRef}
      data-theme={theme}
      className={`fixed top-0 left-0 z-2147483647 w-64 origin-top-left translate-x-(--tooltip-x) translate-y-(--tooltip-y) scale-(--tooltip-scale) rounded-lg border border-solid border-stroke bg-panel p-3 font-mono text-[10px] text-foreground shadow-xl transition-transform duration-100 ease-out ${
        isLocked ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}
