/**
 * This file is responsible for creating and rendering
 * the visual components of the inspector.
 */

import App from "../../App";

import { createOverlay, updateOverlay, hideOverlay } from "../overlay";

import { createTooltip, getTooltipPosition } from "../tooltip";

import {
  createMeasurementOverlay,
  updateMeasurement,
  hideMeasurement,
} from "../measurement";

import {
  modifyProperty,
  resetModifications,
  hasModifications,
} from "../editor";

import { inspectElement } from "../inspector";

import type { InspectionState } from "./state";

/**
 * Creates and manages the inspector's visual components.
 *
 * @param state - the current state of the inspector
 * @param onRefresh - callback used to refresh the inspector after a modification
 */
export function createInspectionRenderer(
  state: InspectionState,
  onRefresh: () => void,
) {
  const overlay = createOverlay();
  const { container, root } = createTooltip();
  const measurementOverlay = createMeasurementOverlay();

  /**
   * Checks whether the given element is still the locked
   * element and can therefore be modified.
   */
  function canModify(element: HTMLElement) {
    return (
      state.isInspecting && state.isLocked && state.inspectedElement === element
    );
  }

  /**
   * Renders the React tooltip using the currently
   * inspected element and cursor position.
   */
  function renderTooltip() {
    const element = state.inspectedElement;

    if (!state.isInspecting || !element) {
      hideTooltip();
      return;
    }

    const position = getTooltipPosition(
      state.cursor.x,
      state.cursor.y,
      state.zoom,
    );

    root.render(
      <App
        {...inspectElement(element)}
        {...position}
        zoom={state.zoom}
        isLocked={state.isLocked}
        canReset={hasModifications(element)}
        onPropertyChange={(property, value) => {
          if (!canModify(element)) return;

          modifyProperty(element, property, value);
          onRefresh();
        }}
        onReset={() => {
          if (!canModify(element)) return;

          resetModifications(element);
          onRefresh();
        }}
      />,
    );
  }

  /**
   * Updates the blue highlight around the inspected element.
   */
  function renderHighlight() {
    const element = state.inspectedElement;

    if (!element) {
      hideHighlight();
      return;
    }

    updateOverlay(overlay, element, state.zoom);
  }

  /**
   * Displays the spacing between the locked element
   * and the currently hovered measurement target.
   */
  function renderMeasurement() {
    const selected = state.inspectedElement;
    const target = state.measurementTarget;

    if (
      !state.isInspecting ||
      !state.isLocked ||
      !selected ||
      !target ||
      !target.isConnected
    ) {
      clearMeasurement();
      return;
    }

    updateMeasurement(measurementOverlay, selected, target, state.zoom);
  }

  /**
   * Clears the measurement target and its visual overlay.
   */
  function clearMeasurement() {
    state.measurementTarget = null;
    hideMeasurement(measurementOverlay);
  }

  /**
   * Hides the blue inspection highlight.
   */
  function hideHighlight() {
    hideOverlay(overlay);
  }

  /**
   * Removes the React tooltip from its Shadow DOM.
   */
  function hideTooltip() {
    root.render(null);
  }

  /**
   * Checks whether an event originated from the tooltip
   * rather than the website itself.
   */
  function isTooltipEvent(event: Event) {
    return event.composedPath().includes(container);
  }

  return {
    renderTooltip,
    renderHighlight,
    renderMeasurement,
    clearMeasurement,
    hideHighlight,
    hideTooltip,
    isTooltipEvent,
  };
}

export type InspectionRenderer = ReturnType<typeof createInspectionRenderer>;
