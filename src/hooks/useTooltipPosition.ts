/**
 * This hook updates the tooltip's position and scale
 * whenever its coordinates or browser zoom change.
 */

import { useLayoutEffect, useRef } from "react";

/**
 * @param top - vertical position of the tooltip
 * @param left - horizontal position of the tooltip
 * @param zoom - browser's zoom factor
 * @returns a ref to attach to the tooltip's DOM element
 */
export function useTooltipPosition(top: number, left: number, zoom: number) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;

    if (!tooltip) return;

    tooltip.style.setProperty("--tooltip-x", `${left}px`);
    tooltip.style.setProperty("--tooltip-y", `${top}px`);
    tooltip.style.setProperty("--tooltip-scale", String(1 / zoom));
  }, [top, left, zoom]);

  return tooltipRef;
}
