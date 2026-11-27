/**
 * This file is responsible for creating, updating, and clearing
 * the measurement overlay.
 */

import { OVERLAY_Z_INDEX } from "../../constants/measurement";

import { getHorizontalMeasurement, getVerticalMeasurement } from "./geometry";

import {
  drawHighlight,
  drawHorizontalMeasurement,
  drawVerticalMeasurement,
} from "./renderer";

/**
 * Creates a transparent overlay that covers the viewport.
 * Uses a Shadow DOM to isolate our measurement elements
 * from the website's CSS.
 */
export function createMeasurementOverlay() {
  const host = document.createElement("div");

  Object.assign(host.style, {
    all: "initial",
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: String(OVERLAY_Z_INDEX),
  });

  const shadow = host.attachShadow({ mode: "open" });

  document.body.appendChild(host);

  return shadow;
}

/**
 * Updates the measurement overlay when hovering over another element.
 *
 * @param overlay - the Shadow DOM containing our measurements
 * @param selected - the currently locked element
 * @param target - the currently hovered element
 * @param zoom - browser's zoom factor
 */
export function updateMeasurement(
  overlay: ShadowRoot,
  selected: HTMLElement,
  target: HTMLElement,
  zoom: number,
) {
  hideMeasurement(overlay);

  // Don't measure an element against itself.
  if (selected === target) return;

  // Get the positions and dimensions of both elements.
  const selectedRect = selected.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // Calculate the spacing between the two elements.
  const horizontal = getHorizontalMeasurement(selectedRect, targetRect);

  const vertical = getVerticalMeasurement(selectedRect, targetRect);

  // Highlight the hovered element.
  drawHighlight(overlay, targetRect, zoom);

  // Render the measurements if a gap exists.
  if (horizontal) {
    drawHorizontalMeasurement(overlay, horizontal, zoom);
  }

  if (vertical) {
    drawVerticalMeasurement(overlay, vertical, zoom);
  }
}

/**
 * Removes all measurement highlights, lines, and labels.
 */
export function hideMeasurement(overlay: ShadowRoot) {
  overlay.replaceChildren();
}
