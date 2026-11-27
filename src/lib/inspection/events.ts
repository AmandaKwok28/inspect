/**
 * This file is responsible for listening to browser events
 * and responding to user interactions with the inspector.
 */

import type { InspectionState } from "./state";
import type { InspectionRenderer } from "./renderer";

type InspectionActions = {
  toggleInspection: () => void;
  deactivate: () => void;
  clearSelection: () => void;
  refreshInspector: () => void;
  changeZoom: (zoom: number) => void;
};

/**
 * Checks whether a keyboard event originated from an
 * editable element.
 *
 * Prevents inspector shortcuts from interfering with typing.
 */
function isTyping(event: KeyboardEvent) {
  return event
    .composedPath()
    .some(
      (target) =>
        target instanceof HTMLElement &&
        (target.matches("input, textarea, select") || target.isContentEditable),
    );
}

/**
 * Determines whether the user pressed the shortcut
 * for deactivating the inspector.
 */
function isQuitShortcut(event: KeyboardEvent) {
  return (
    event.key.toLowerCase() === "q" &&
    !isTyping(event) &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.repeat
  );
}

/**
 * Registers all browser event listeners for the inspector.
 *
 * @param state - the current state of the inspector
 * @param renderer - functions used to update visual components
 * @param actions - functions used to control the inspection lifecycle
 */
export function registerInspectionEvents(
  state: InspectionState,
  renderer: InspectionRenderer,
  actions: InspectionActions,
) {
  /**
   * Receives messages from the extension's background
   * service worker.
   */
  chrome.runtime.onMessage.addListener((message) => {
    switch (message.type) {
      case "TOGGLE_INSPECT":
        state.zoom = message.zoom ?? 1;
        actions.toggleInspection();
        break;

      case "ZOOM_CHANGED":
        actions.changeZoom(message.zoom);
        break;
    }
  });

  /**
   * Updates the inspected element while unlocked, or
   * measures spacing against another element while locked.
   */
  function handleMouseMove(event: MouseEvent) {
    if (!state.isInspecting) return;

    // Ignore interactions with our own tooltip.
    if (renderer.isTooltipEvent(event)) {
      renderer.clearMeasurement();
      return;
    }

    const element = event.target;

    if (!(element instanceof HTMLElement)) {
      renderer.clearMeasurement();
      return;
    }

    if (state.isLocked) {
      handleMeasurementHover(element);
      return;
    }

    handleInspectionHover(element, event);
  }

  /**
   * Updates the measurement target without changing
   * the currently locked element.
   */
  function handleMeasurementHover(element: HTMLElement) {
    if (element === state.inspectedElement) {
      renderer.clearMeasurement();
      return;
    }

    state.measurementTarget = element;

    renderer.renderMeasurement();
  }

  /**
   * Updates the inspected element and moves the tooltip
   * alongside the cursor.
   */
  function handleInspectionHover(element: HTMLElement, event: MouseEvent) {
    if (element !== state.inspectedElement) {
      state.inspectedElement = element;
      renderer.renderHighlight();
    }

    state.cursor.x = event.clientX;
    state.cursor.y = event.clientY;

    renderer.renderTooltip();
  }

  /**
   * Locks the currently inspected element when clicked.
   *
   * Prevents the click from triggering the website's
   * normal click behavior.
   */
  function handleClick(event: MouseEvent) {
    if (!state.isInspecting || state.isLocked || !state.inspectedElement) {
      return;
    }

    if (renderer.isTooltipEvent(event)) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    state.isLocked = true;

    renderer.renderTooltip();
  }

  /**
   * Handles keyboard shortcuts for deactivating
   * the inspector and clearing the current selection.
   */
  function handleKeyDown(event: KeyboardEvent) {
    if (!state.isInspecting) return;

    if (isQuitShortcut(event)) {
      event.preventDefault();
      actions.deactivate();
      return;
    }

    if (event.key === "Escape") {
      actions.clearSelection();
    }
  }

  // Mouse interactions
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("click", handleClick, true);

  // Keyboard interactions
  document.addEventListener("keydown", handleKeyDown);

  // Clear measurements when leaving the page.
  window.addEventListener("blur", renderer.clearMeasurement);

  document.documentElement.addEventListener(
    "mouseleave",
    renderer.clearMeasurement,
  );

  // Recalculate positions when the viewport changes.
  window.addEventListener("resize", actions.refreshInspector);

  document.addEventListener("scroll", actions.refreshInspector, true);
}
