/**
 * This file is responsible for initializing and managing
 * the lifecycle of the inspector.
 */

import { createInspectionState } from "./state";
import { createInspectionRenderer } from "./renderer";
import { registerInspectionEvents } from "./events";

/**
 * Initializes the inspector's state, visual components,
 * and browser event listeners.
 */
export function initializeInspector() {
  const state = createInspectionState();

  const renderer = createInspectionRenderer(state, refreshInspector);

  /**
   * Refreshes all visual components of the inspector.
   *
   * Used when the inspected element changes, the viewport
   * changes, or the element's CSS properties are modified.
   */
  function refreshInspector() {
    const element = state.inspectedElement;

    if (!state.isInspecting || !element) return;

    // Clear the selection if the element was removed
    // from the webpage's DOM.
    if (!element.isConnected) {
      clearSelection();
      return;
    }

    renderer.renderHighlight();
    renderer.renderMeasurement();
    renderer.renderTooltip();
  }

  /**
   * Clears the current selection and hides all of
   * the inspector's visual components.
   *
   * Does not deactivate inspection mode.
   */
  function clearSelection() {
    state.isLocked = false;
    state.inspectedElement = null;

    renderer.clearMeasurement();
    renderer.hideHighlight();
    renderer.hideTooltip();
  }

  /**
   * Deactivates inspection mode and clears the selection.
   */
  function deactivate() {
    state.isInspecting = false;

    clearSelection();
  }

  /**
   * Toggles inspection mode on or off.
   */
  function toggleInspection() {
    if (state.isInspecting) {
      deactivate();
    } else {
      state.isInspecting = true;
    }
  }

  /**
   * Updates the browser zoom factor and adjusts the
   * stored cursor coordinates accordingly.
   *
   * @param newZoom - the browser's updated zoom factor
   */
  function changeZoom(newZoom: number) {
    const zoomRatio = state.zoom / newZoom;

    state.cursor.x *= zoomRatio;
    state.cursor.y *= zoomRatio;

    state.zoom = newZoom;

    requestAnimationFrame(refreshInspector);
  }

  // Register browser and extension event listeners.
  registerInspectionEvents(state, renderer, {
    toggleInspection,
    deactivate,
    clearSelection,
    refreshInspector,
    changeZoom,
  });

  // Notify the background service worker that the
  // content script has finished initializing.
  chrome.runtime.sendMessage({
    type: "INSPECT_READY",
  });
}
