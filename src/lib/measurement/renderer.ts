/**
 * This file is responsible for rendering measurement highlights,
 * lines, endpoint ticks, and distance labels inside the overlay.
 */

import {
  MEASUREMENT_COLOR,
  BORDER_RADIUS,
  LINE_THICKNESS,
  TICK_SIZE,
  LABEL_FONT_SIZE,
  LABEL_BORDER_RADIUS,
  LABEL_PADDING_X,
  LABEL_PADDING_Y,
  HORIZONTAL_LABEL_OFFSET,
  VERTICAL_LABEL_OFFSET,
} from "../../constants/measurement";

import type { Measurement } from "./geometry";

/**
 * Creates an absolutely positioned div inside the measurement overlay.
 *
 * @param overlay - the Shadow DOM containing our measurement elements
 * @param styles - additional CSS properties for the div
 */
function drawBox(overlay: ShadowRoot, styles: Partial<CSSStyleDeclaration>) {
  const element = document.createElement("div");

  Object.assign(element.style, {
    position: "absolute",
    boxSizing: "border-box",
    pointerEvents: "none",
    ...styles,
  });

  overlay.appendChild(element);

  return element;
}

/**
 * Draws a solid orange rectangle used for measurement
 * lines and endpoint ticks.
 */
function drawLine(
  overlay: ShadowRoot,
  left: number,
  top: number,
  width: number,
  height: number,
) {
  drawBox(overlay, {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: MEASUREMENT_COLOR,
  });
}

/**
 * Displays the measured distance at the given coordinates.
 * Compensates for browser zoom to maintain a consistent label size.
 *
 * @param x - horizontal position of the label's center
 * @param y - vertical position of the label's center
 * @param distance - measured distance in CSS pixels
 * @param zoom - browser's zoom factor
 */
function drawLabel(
  overlay: ShadowRoot,
  x: number,
  y: number,
  distance: number,
  zoom: number,
) {
  const label = drawBox(overlay, {
    left: `${x}px`,
    top: `${y}px`,
    transform: "translate(-50%, -50%)",
    backgroundColor: MEASUREMENT_COLOR,
    color: "#ffffff",
    fontFamily: "monospace",
    fontSize: `${LABEL_FONT_SIZE / zoom}px`,
    lineHeight: "1.2",
    padding: `${LABEL_PADDING_Y / zoom}px ${LABEL_PADDING_X / zoom}px`,
    borderRadius: `${LABEL_BORDER_RADIUS / zoom}px`,
    whiteSpace: "nowrap",
  });

  label.textContent = `${Number(distance.toFixed(1))}px`;
}

/**
 * Draws the orange bounding box around the hovered element.
 */
export function drawHighlight(
  overlay: ShadowRoot,
  rect: DOMRect,
  zoom: number,
) {
  drawBox(overlay, {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    border: `${LINE_THICKNESS / zoom}px solid ${MEASUREMENT_COLOR}`,
    borderRadius: `${BORDER_RADIUS}px`,
  });
}

/**
 * Draws a horizontal measurement line, its endpoint ticks,
 * and its distance label.
 */
export function drawHorizontalMeasurement(
  overlay: ShadowRoot,
  measurement: Measurement,
  zoom: number,
) {
  const { start, end, position: y } = measurement;

  const thickness = LINE_THICKNESS / zoom;
  const tickSize = TICK_SIZE / zoom;
  const distance = end - start;

  // Draw the horizontal measurement line.
  drawLine(overlay, start, y - thickness / 2, distance, thickness);

  // Draw a vertical tick at each endpoint.
  for (const x of [start, end]) {
    drawLine(overlay, x - thickness / 2, y - tickSize, thickness, tickSize * 2);
  }

  // Center the distance label above the line.
  drawLabel(
    overlay,
    start + distance / 2,
    y - HORIZONTAL_LABEL_OFFSET / zoom,
    distance,
    zoom,
  );
}

/**
 * Draws a vertical measurement line, its endpoint ticks,
 * and its distance label.
 */
export function drawVerticalMeasurement(
  overlay: ShadowRoot,
  measurement: Measurement,
  zoom: number,
) {
  const { start, end, position: x } = measurement;

  const thickness = LINE_THICKNESS / zoom;
  const tickSize = TICK_SIZE / zoom;
  const distance = end - start;

  // Draw the vertical measurement line.
  drawLine(overlay, x - thickness / 2, start, thickness, distance);

  // Draw a horizontal tick at each endpoint.
  for (const y of [start, end]) {
    drawLine(overlay, x - tickSize, y - thickness / 2, tickSize * 2, thickness);
  }

  // Center the distance label to the right of the line.
  drawLabel(
    overlay,
    x + VERTICAL_LABEL_OFFSET / zoom,
    start + distance / 2,
    distance,
    zoom,
  );
}
