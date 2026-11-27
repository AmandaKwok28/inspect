import { createRoot } from "react-dom/client";
import css from "../index.css?inline";

/**
 * Creates a container element and attaches a Shadow DOM to it. It injects our
 * compiled tailwind stylesheet into the ShadowDOM and initializes a react root.
 *
 * TLDR: it creates an isolated DOM subtree where we can render our tooltip. It's for DOM
 *       management
 */
export function createTooltip() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: "open" });

  const stylesheet = document.createElement("style");
  stylesheet.textContent = css;
  shadow.appendChild(stylesheet);

  // tells react to render our component inside the subtree (shadow DOM contained in container div)
  const root = createRoot(shadow);

  return { container, root };
}

/**
 * Calculates where our tooltip should appear relative to the cursor while accounting
 * for browser zoom and viewport boundaries
 *
 * @param cursorX
 * @param cursorY
 * @param zoom
 * @returns { top, left } which are the positions for where to render the tooltip
 */
export function getTooltipPosition(
  cursorX: number,
  cursorY: number,
  zoom: number,
) {
  const width = 256 / zoom;
  const height = 200 / zoom;
  const gap = 28 / zoom;
  const edge = 8 / zoom;

  const left = Math.max(
    edge,
    Math.min(cursorX + gap, window.innerWidth - width - edge),
  );

  const top =
    cursorY + gap + height > window.innerHeight
      ? Math.max(edge, cursorY - height - gap)
      : cursorY + gap;

  return { top, left };
}
