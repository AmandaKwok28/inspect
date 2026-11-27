/**
 * This file is responsible for creating, positioning, styling, and hiding the blue
 * highlight around the hovered element.
 */

/**
 * Creates the blue overlay
 * - creates a new div
 * - assigns the general styling like border and bg color
 * - starts off invisible until updateOverlay adjusts its size to the div it's overlaying
 */
export function createOverlay() {
  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    all: "initial",
    position: "fixed",
    border: "1px solid #3b82f6",
    borderRadius: "6px",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    pointerEvents: "none",
    zIndex: "2147483647",
    boxSizing: "border-box",
    display: "none",
  });

  document.body.appendChild(overlay);

  return overlay;
}

/**
 * Adjusts and displays the bounding box overlay when you move your mouse
 * @param overlay - the div we created
 * @param element - the element we're hovering over
 * @param zoom - browser's zoom factor used to maintain a consistent border thickness
 */
export function updateOverlay(
  overlay: HTMLElement,
  element: HTMLElement,
  zoom: number,
) {
  // get size and position of the hovered element
  const rect = element.getBoundingClientRect();

  // set the position and size of the overlay
  Object.assign(overlay.style, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderWidth: `${1 / zoom}px`,
    display: "block",
  });
}

/**
 * Hides overlay when you move off the element
 * or clear the selection
 */
export function hideOverlay(overlay: HTMLElement) {
  overlay.style.display = "none";
}
